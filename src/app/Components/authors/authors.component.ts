import { Component } from '@angular/core';
import { authors, books, genres } from '../../data';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { AuthorManageDialogComponent } from 'src/app/Dialogs/author-manage-dialog/author-manage-dialog.component';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';

export interface AuthorManageDialog {
  id: number;
  name: string;
  genreId: number;
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  author: string | undefined;
  authors: any;
  genres: any;
  books: any;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    let data = localStorage.getItem('authors');
    this.authors = data ? JSON.parse(data) : authors;
  
    let dataGenres = localStorage.getItem('genres');
    this.genres = dataGenres ? JSON.parse(dataGenres) : genres;

    let dataBooks = localStorage.getItem('books');
    this.books = dataBooks ? JSON.parse(dataBooks) : books;
  }

  localStorageUpdate = () =>
    localStorage.setItem('authors', JSON.stringify(this.authors));

  showGenres(genreIds: any) {
    return this.genres
      .filter((elem: { id: any }) => genreIds.includes(elem.id))
      .map((elem: { name: string }) => elem.name)
      .join(', ');
  }
  openAddDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      title: 'Please add a new author.',
      content: AuthorManageDialogComponent,
      width: '35%',
      height: '40%',
    });
    const inputs = dialogRef.content.instance as AuthorManageDialogComponent;
    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Add') {
        if (
          !this.authors.every(
            (elem: { name: string }) =>
              elem.name !== inputs.formGroup.value.author
          )
        ) {
          alert(inputs.formGroup.value.author + ' is already in the list!');
          return;
        }

        let newID =
          Math.max(...this.authors.map((elem: { id: number }) => elem.id)) + 1;
        // let newID = this.authors.reduce((accum: number, elem: { id: number }) =>accum > elem.id ? accum : elem.id, 0) + 1;
        this.authors.push({
          id: newID,
          name: inputs.formGroup.value.name,
          born: inputs.formGroup.value.born,
          died: inputs.formGroup.value.died,
          genreId: inputs.formGroup.value.genreId,
        });
        this.localStorageUpdate();
      }
    });
  }

  openEditDialog(author: any) {
    let index = this.authors.indexOf(author);
    const dialogRef = this.dialogService.open({
      title: 'Please edit ' + author.name + '.',
      content: AuthorManageDialogComponent,
      width: '35%',
      height: '45%',
      // actions: [{ text: 'Cancel' }, { text: 'Confirm', themeColor: 'info' }],
    });
    const editAuthor = dialogRef.content
      .instance as AuthorManageDialogComponent;

    editAuthor.author = author;
    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Add' && editAuthor.author?.name) {
        this.authors[index] = { id: author.id, ...r.author };
        this.localStorageUpdate();
      }
    });
  }

  openDelDialog(author: any) {
    let cannotDeleteAuthor = this.books.some((elem: { authorId: any; }) => elem.authorId === author.id)
    const dialogRef: DialogRef = this.dialogService.open({
      content: DeleteDialogComponent,
    });
    const dialogInstance = dialogRef.content.instance as DeleteDialogComponent;
    dialogInstance.item = author;
    dialogInstance.deletingItemIsExists = cannotDeleteAuthor;
    let connectedBooks;
    if (cannotDeleteAuthor) {
        connectedBooks = this.books
        .filter((elem: { authorId: any }) => elem.authorId === author.id)
        .map((elem: { name: string }) => elem.name)
        .join(', ');
    }
    
    dialogInstance.existingMessage = cannotDeleteAuthor
      ? connectedBooks + `${connectedBooks.includes(",") ? ' are ': ' is '}` + 'written by ' + author.name
      : ' Are you sure you want to delete ' + author.name + "?";

    dialogRef.result.subscribe((r: any) => {
      if (r.deleting) {
        let index = this.authors.indexOf(author);
        this.authors = this.authors.filter(
          (elem: any, ind: number) => index !== ind
        );
        this.localStorageUpdate();
      }
    });
  }
}
