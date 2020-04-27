import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Country} from '../../../interfaces/country';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-edit-country-dialog',
  templateUrl: './edit-country-dialog.component.html',
  styleUrls: ['./edit-country-dialog.component.css']
})
export class EditCountryDialogComponent implements OnInit {

  countryForm: FormGroup;
  loaded = false;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<EditCountryDialogComponent>,
              private fs: FirebaseService) { }

  ngOnInit() {
    this.fs.getCountry(this.data).subscribe((value: Country) => {
      this.countryForm = this.fb.group({
        nameEn: [value.nameEn, Validators.required],
        nameRu: [value.nameRu, Validators.required]
      });
      this.loaded = true;
    });

   /* this.afs.collection('countries', ref => ref.where('nameEn', '==', this.data.nameEn)).snapshotChanges().subscribe(value => {
      console.log('Queried ', value);
    });*/
  }

  onSubmit() {
    if (this.countryForm.valid && this.countryForm.dirty) {
      console.log('Submit ', this.countryForm.value);
      this.fs.updateCountry(this.data, this.countryForm.value).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.countryForm);
    }
  }
}
