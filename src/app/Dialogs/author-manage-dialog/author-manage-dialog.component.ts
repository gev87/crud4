import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { Authors, genres } from 'src/app/data';


@Component({
  selector: 'app-author-add-dialog',
  templateUrl: './author-manage-dialog.component.html',
  styleUrls: ['./author-manage-dialog.component.css'],
})
export class AuthorManageDialogComponent
  extends DialogContentBase
  implements OnInit
{
  public formGroup!: FormGroup;
  @Input() public author: Authors = new Authors();
  
  public genres: any = [];

  constructor(public override dialog: DialogRef, private fb: FormBuilder) {
    super(dialog);
  }
  public ngOnInit(): void {
    
    this.formGroup = this.fb.group({
      genreId: [this.author.genreId, Validators.required],
      name: [this.author.name, Validators.required],
      born: this.author.born ? new Date(this.author.born) : null ,
      died: this.author.died ? new Date(this.author.died) : null,
    });
    let data = localStorage.getItem('genres');
    this.genres = data ? JSON.parse(data) : genres;
    
  }

  public onCancelAction(): void {
    this.dialog.close({ text: 'Cancel' });
  }

  public onConfirmAction(): void {
    this.dialog.close({
      text: 'Add',
      author: this.formGroup.value,
    });
  }
}

