import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BugReportDecoded} from '../../interfaces/bug-report-decoded';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BugReportDecoded,
              private dialogRef: MatDialogRef<ReportDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  loadSave() {
    this.dialogRef.close(this.data.save);
  }
}
