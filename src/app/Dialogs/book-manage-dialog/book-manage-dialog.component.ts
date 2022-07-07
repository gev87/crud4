import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { Authors, authors, Books, genres } from 'src/app/data';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-manage-dialog.component.html',
  styleUrls: ['./book-manage-dialog.component.css'],
})
export class BookManageDialogComponent extends DialogContentBase implements OnInit {
  public formGroup!: FormGroup;
  @Input() public book: Books = new Books();
  @Input() public filteredAuthors: any;
  genres: any;
  authors: any;
  

  constructor(public override dialog: DialogRef, private fb: FormBuilder) {
    super(dialog);
  }
  public ngOnInit(): void {
    // this.authorsOldName = this.author.name;

    this.formGroup = this.fb.group({
      name: [this.book.name, Validators.required],
      published: this.book.published ? new Date(this.book.published) : null,
      pages: [this.book.pages],
      genreId: [this.book.genreId, Validators.required],
      authorId: [this.book.authorId, Validators.required],
    });
    let localGenres = localStorage.getItem('genres');
    this.genres = localGenres ? JSON.parse(localGenres) : genres;
    let localAuthors = localStorage.getItem('authors');
    this.authors = localAuthors ? JSON.parse(localAuthors) : authors;

    // this.formGroup.get('genreId')?.setValue(20);
    // console.log(this.formGroup.get('genreId')?.value);
    this.formGroup.get('genreId')?.valueChanges.subscribe((chosenGenreId) => {
      this.formGroup.get('authorId')?.setValue(null);
      this.filteredAuthors = this.authors.filter(
        (elem: { genreId: any[] }) => elem.genreId.includes(chosenGenreId)
      );
    });
  }
  public onCancelAction(): void {
    this.dialog.close({ text: 'Cancel' });
  }

  public onConfirmAction(): void {
    this.dialog.close({
      text: 'Add',
      book: this.formGroup.value,
    });
  }

  // public onGenreChange = (genreId: number) => {
  //   console.log(genreId);
  // };
}
