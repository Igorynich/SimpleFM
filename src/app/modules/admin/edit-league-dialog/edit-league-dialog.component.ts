import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FirebaseService} from '../../../services/firebase.service';
import {League} from '../../../interfaces/league';
import {combineLatest, forkJoin} from 'rxjs';
import {Country} from '../../../interfaces/country';

@Component({
  selector: 'app-edit-league-dialog',
  templateUrl: './edit-league-dialog.component.html',
  styleUrls: ['./edit-league-dialog.component.css']
})
export class EditLeagueDialogComponent implements OnInit {

  countryList: Country[] = [];
  leagueForm: FormGroup;
  loaded = false;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<EditLeagueDialogComponent>,
              private fs: FirebaseService) { }

  ngOnInit() {
    combineLatest(this.fs.getCountries(), this.fs.getLeague(this.data)).subscribe(([countries, league]) => {
      console.log('-----', countries, league);
      this.countryList = countries;
      const countryValue = countries.find(value => value.nameEn === league.countryNameEn && value.nameRu === league.countryNameRu);
      this.leagueForm = this.fb.group({
        altNameEn: [league.altNameEn],
        altNameRu: [league.altNameRu],
        country: [countryValue],
        nameEn: [league.nameEn, Validators.required],
        nameRu: [league.nameRu, Validators.required]
      });
      this.loaded = true;
    }, error => {
      console.error(error);
    });
    // this.fs.getCountries().pipe(mergeMap(value => ))
    /*this.fs.getLeague(this.data).subscribe((value: League) => {
      this.leagueForm = this.fb.group({
        altNameEn: [value.altNameEn],
        altNameRu: [value.altNameRu],
        country: [''],
        nameEn: [value.nameEn, Validators.required],
        nameRu: [value.nameRu, Validators.required]
      });
      this.loaded = true;
    });*/
  }

  onSubmit() {
    if (this.leagueForm.valid && this.leagueForm.dirty) {
      console.log('Submit ', this.leagueForm.value);
      const leagueData = {
        altNameEn: this.leagueForm.value.altNameEn,
        altNameRu: this.leagueForm.value.altNameRu,
        // country: `/countries/${this.leagueForm.value.country.id}`,
        countryNameEn: this.leagueForm.value.country.nameEn,
        countryNameRu: this.leagueForm.value.country.nameRu,
        nameEn: this.leagueForm.value.nameEn,
        nameRu: this.leagueForm.value.nameRu
      };
      this.fs.updateLeague(this.data, leagueData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.leagueForm);
    }
  }

}
