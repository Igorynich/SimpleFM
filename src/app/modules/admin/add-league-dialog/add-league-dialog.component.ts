import { Component, OnInit } from '@angular/core';
import {Country} from '../../../interfaces/country';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialogRef} from '@angular/material/dialog';
import {League} from '../../../interfaces/league';

@Component({
  selector: 'app-add-league-dialog',
  templateUrl: './add-league-dialog.component.html',
  styleUrls: ['./add-league-dialog.component.css']
})
export class AddLeagueDialogComponent implements OnInit {

  countryList: Country[] = [];
  leagueForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fs: FirebaseService,
              private dialogRef: MatDialogRef<AddLeagueDialogComponent>) { }

  ngOnInit(): void {
    this.leagueForm = this.fb.group({
      altNameEn: ['', Validators.required],
      altNameRu: ['', Validators.required],
      country: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required]
    });
    this.fs.getCountries(false).subscribe(countries => {
      this.countryList = countries;
    });
  }

  onSubmit() {
    if (this.leagueForm.valid && this.leagueForm.dirty) {
      console.log('Submit ', this.leagueForm.value);
      const leagueData: League = {
        altNameEn: this.leagueForm.value.altNameEn,
        altNameRu: this.leagueForm.value.altNameRu,
        country: `/countries/${this.leagueForm.value.country.id}`,
        countryNameEn: this.leagueForm.value.country.nameEn,
        countryNameRu: this.leagueForm.value.country.nameRu,
        nameEn: this.leagueForm.value.nameEn,
        nameRu: this.leagueForm.value.nameRu
      };
      this.fs.addLeague(leagueData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.leagueForm);
    }
  }

}
