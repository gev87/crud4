import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Authors, Books, Genres } from 'src/app/data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {

  @Input() public deletingItemIsExists!: boolean;
  @Input() public item!: Genres | Authors | Books;
  @Input() public existingMessage!: string;

  constructor(
    public dialog: DialogRef
  ) { }

  public closeDialog = () => {
    this.dialog.close();
  };

  public deleteItem = () => {
    this.dialog.close({deleting: true,});
  };
}
