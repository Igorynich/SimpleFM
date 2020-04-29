import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmationDialogData} from '../../interfaces/confirmation-dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  defaultHeader = 'Вы уверены?';
  yes = {
    txt: 'Да',
    value: true
  };
  no = {
    txt: 'Нет',
    value: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }

  ngOnInit() {
  }

}
