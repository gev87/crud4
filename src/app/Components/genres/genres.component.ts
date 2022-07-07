import { Component } from '@angular/core';
import { authors, genres, Genres as GenresViewModel } from '../../data';
import { GenreManageDialogComponent } from '../../Dialogs/genre-manage-dialog/genre-manage-dialog.component';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';

export interface DialogGenre {
  id: number;
  name: string;
}

export interface EditDialogGenre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent {
  genres: any;
  genre!: string;
  cannotDelete: any;
  authors: any;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    let dataGenres = localStorage.getItem('genres');
    this.genres = dataGenres ? JSON.parse(dataGenres) : genres;

    let dataAuthors = localStorage.getItem('authors');
    this.authors = dataAuthors ? JSON.parse(dataAuthors) : authors;
  }

  localStorageUpdate = () =>
    localStorage.setItem('genres', JSON.stringify(this.genres));

  public openAddDialog(): void {
    const dialogRef = this.dialogService.open({
      title: 'Add new genre',
      content: GenreManageDialogComponent,
      width: '20%',
      height: '25%',
    });
    const newGenre = dialogRef.content.instance as GenreManageDialogComponent;
    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Submit') {
        if (
          !this.genres.every(
            (elem: { name: string }) =>
              elem.name !== newGenre.formGroup.value.genre
          )
        ) {
          alert('you alredy have ' + newGenre.formGroup.value.genre + '!');
          return;
        }
        let newID =
          this.genres.reduce(
            (accum: number, elem: { id: number }) =>
              accum > elem.id ? accum : elem.id,
            0
          ) + 1;
        this.genres.push({ id: newID, name: newGenre.formGroup.value.genre });
        this.localStorageUpdate();
      }
    });
  }

  public openEditDialog(elem: { id: number; name: string }): void {
    let index = this.genres.indexOf(elem);
    const dialogRef = this.dialogService.open({
      title: 'Please edit ' + elem.name,
      content: GenreManageDialogComponent,
      width: '20%',
      height: '25%',
      // actions: [{ text: 'Cancel' }, { text: 'Confirm', themeColor: 'info' }],
    });
    const editGenre = dialogRef.content.instance as GenreManageDialogComponent;
    editGenre.genre = elem.name;
    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Submit') {
        if (
          this.genres.some(
            (elem: { name: string }) =>
              elem.name === editGenre.formGroup.value.genre
          )
        ) {
          alert('We already have ' + editGenre.formGroup.value.genre + '!');
          return;
        }
        this.genres[index].name = editGenre.formGroup.value.genre;
        this.localStorageUpdate();
      }
    });
  }

  openDeleteDialog(genreItem: GenresViewModel) {
    let isGenreExistsOnOtherItems: boolean = this.authors.some(
      (elem: { genreId: any[] }) => elem.genreId[0] === genreItem.id
    );
    const dialogRef: DialogRef = this.dialogService.open({
      // title: this.cannotDelete
      //   ? 'You cannot delete ' + genreItem.name
      //   : 'Please confirm deleting ' + genreItem.name,
      // Show component
      content: DeleteDialogComponent,
      // actions: this.cannotDelete
      //   ? [{ text: 'OK', themeColor: 'info' }]
      //   : [{ text: 'No' }, { text: 'Confirm', themeColor: 'primary' }],
    });
    const dialogInstance = dialogRef.content.instance as DeleteDialogComponent;
    // dialogInstance.genre = genreItem;
    // dialogInstance.cannotDeleteGenre = this.cannotDelete;

    let connectedAuthors;
    if (isGenreExistsOnOtherItems) {
      connectedAuthors = this.authors
        .filter((elem: { genreId: any[] }) => elem.genreId[0] === genreItem.id)
        .map((elem: { name: string }) => elem.name)
        .join(', ');
    }

    dialogInstance.item = genreItem;
    dialogInstance.deletingItemIsExists = isGenreExistsOnOtherItems;
    dialogInstance.existingMessage = isGenreExistsOnOtherItems
      ? `${connectedAuthors} write${
          connectedAuthors.includes(',') ? '' : 's'
        } in a genre ${genreItem.name}.`
      : `Are you sure you want to delete ${genreItem.name}.`;


    dialogRef.result.subscribe((r: any) => {
      if (r.deleting) {
        let index = this.genres.indexOf(genreItem);
        this.genres = this.genres.filter(
          (elem: any, ind: number) => index !== ind
        );
        this.localStorageUpdate();
      }
    });
  }
}
