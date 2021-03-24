import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Club} from '../../interfaces/club';
import {UserService} from '../../services/user.service';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Club,
              private dialogRef: MatDialogRef<InfoDialogComponent>,
              public userService: UserService,
              public config: ConfigService) { }

  ngOnInit(): void {
  }

}
