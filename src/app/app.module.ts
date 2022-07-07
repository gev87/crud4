import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenresComponent } from './Components/genres/genres.component';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GenreManageDialogComponent } from './Dialogs/genre-manage-dialog/genre-manage-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksComponent } from './Components/books/books.component';
import { AuthorsComponent } from './Components/authors/authors.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DeleteDialogComponent } from './Dialogs/delete-dialog/delete-dialog.component';
import { AuthorManageDialogComponent } from './Dialogs/author-manage-dialog/author-manage-dialog.component';

import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BookManageDialogComponent } from './Dialogs/book-manage-dialog/book-manage-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    GenreManageDialogComponent,
    BooksComponent,
    AuthorsComponent,
    PageNotFoundComponent,
    DeleteDialogComponent,
    AuthorManageDialogComponent,
    BookManageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    DialogsModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    DateInputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GenreManageDialogComponent],
})
export class AppModule {}
