import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogGenre } from '../../Components/genres/genres.component';
import {
  DialogContentBase,
  DialogRef,
  PreventableEvent,
} from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './genre-manage-dialog.component.html',
  styleUrls: ['./genre-manage-dialog.component.css'],
})
export class GenreManageDialogComponent extends DialogContentBase implements OnInit {
  @Input() public genre: string | undefined;

  public formGroup!: FormGroup;
  add: any;
  
  constructor(public override dialog: DialogRef, private fb: FormBuilder) {
    super(dialog);
  }

  public ngOnInit():void {
    this.formGroup = this.fb.group({
      genre: [this.genre, Validators.required],
    });
    this.add = this.genre;
  }

  // public onClose(ev: PreventableEvent): void {
  //   this.formGroup.get('name').markAsTouched();
  //   // prevent dialog from closing on clicking the `X` (close) button
  //   ev.preventDefault();
  // }

  public onCancelAction(): void {
    this.dialog.close({ text: 'Cancel' });
  }

  public onConfirmAction(): void {
    
    this.dialog.close({ text: 'Submit', genre: this.formGroup.value });
  }
}
