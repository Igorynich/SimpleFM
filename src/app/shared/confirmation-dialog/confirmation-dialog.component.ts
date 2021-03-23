import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmationDialogData} from '../../interfaces/confirmation-dialog-data';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  defaultHeader = $localize `Вы уверены?`;
  yes = {
    txt: $localize `Да`,
    value: true
  };
  no = {
    txt: $localize `Нет`,
    value: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
              private config: ConfigService) { }

  ngOnInit() {
  }

}
