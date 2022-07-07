import { Component, OnInit } from '@angular/core';
import { authors, Books, books, genres } from '../../data';
import { BookManageDialogComponent } from 'src/app/Dialogs/book-manage-dialog/book-manage-dialog.component';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: any;
  genres: any;
  authors: any;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    let booksData: any = localStorage.getItem('books');
    this.books = booksData ? JSON.parse(booksData) : books;

    let genresData: any = localStorage.getItem('genres');
    this.genres = genresData ? JSON.parse(genresData) : genres;

    let authorData: any = localStorage.getItem('authors');
    this.authors = authorData ? JSON.parse(authorData) : authors;

    // this.books = this.alldata.reduce(
    //   (accum: any, elem: any) =>
    //     !accum.includes(elem.book) ? accum.concat(elem.book) : accum,
    //   []
    // );
  }

  public getGenreNamebyId(id: any) {
    return this.genres.filter((elem: { id: any }) => elem.id === id)[0].name;
  }

  public getAuthorNamebyId(id: any) {
    return this.authors.filter((elem: { id: any }) => elem.id === id)[0].name;
  }

  localStorageUpdate(): void {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  public delete(book: { id: number; name: string }): void {
    const dialogRef: DialogRef = this.dialogService.open({
      content: DeleteDialogComponent,
    });
    const dialogInstance = dialogRef.content.instance as DeleteDialogComponent;
    dialogInstance.item = book;
    dialogInstance.existingMessage = "Are you sure you want to delete " + book.name + "?";
    dialogRef.result.subscribe((r: any) => {
      if (r.deleting) {
        let index = this.books.indexOf(book);
        this.books = this.books.filter(
          (elem: any, ind: number) => index !== ind
        );
        this.localStorageUpdate();
      }
    })
  }
  public addNew(): void {
    const dialogRef = this.dialogService.open({
      title: 'Add a new book',
      content: BookManageDialogComponent,
      width: '30%',
      height: '55%',
    });
    const newBook = dialogRef.content.instance as BookManageDialogComponent;

    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Add') {
        if (
          !this.books.every(
            (elem: { name: string }) =>
              elem.name !== newBook.formGroup.value.name
          )
        ) {
          alert(newBook.formGroup.value.name + ' is already in the list!');
          return;
        }

        let newID =
          Math.max(...this.books.map((elem: { id: number }) => elem.id)) + 1;
        this.books.push({
          id: newID,
          name: newBook.formGroup.value.name,
          published: newBook.formGroup.value.published,
          pages: newBook.formGroup.value.pages,
          genreId: newBook.formGroup.value.genreId,
          authorId: newBook.formGroup.value.authorId,
        });
        this.localStorageUpdate();
      }
    });
  }

  public edit(item: any): void {
    let index = this.books.indexOf(item);
    const dialogRef = this.dialogService.open({
      title: `edit ${item.name}`,
      content: BookManageDialogComponent,
      width: '30%',
      height: '55%',
    });
    const editBook = dialogRef.content.instance as BookManageDialogComponent;

    editBook.book = item;
    editBook.filteredAuthors = this.authors.filter(
      (elem: { id: number }) => elem.id === item.authorId
    );

    dialogRef.result.subscribe((r: any) => {
      if (r.text === 'Add') {
        let check = this.books.filter((elem: any, ind: any) => ind !== index);
        if (
          !check.every(
            (elem: { name: string }) =>
              elem.name !== editBook.formGroup.value.name
          )
        ) {
          alert(editBook.formGroup.value.name + ' is already in the list!');
          return;
        }
        this.books[index] = { id: item.id, ...r.book };
      }
    });
    this.localStorageUpdate();
  }
}
