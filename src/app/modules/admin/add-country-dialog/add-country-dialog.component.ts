import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {FirebaseService} from '../../../services/firebase.service';
import {emptyStringValidator} from '../../../utils/validators';

@Component({
  selector: 'app-add-country-dialog',
  templateUrl: './add-country-dialog.component.html',
  styleUrls: ['./add-country-dialog.component.css']
})
export class AddCountryDialogComponent implements OnInit {
  newCountryForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddCountryDialogComponent>,
              private fs: FirebaseService) { }

  ngOnInit() {
    this.newCountryForm = this.fb.group({
      nameEn: ['', [Validators.required, emptyStringValidator]],
      nameRu: ['', [Validators.required, emptyStringValidator]]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.newCountryForm.valid) {
      this.fs.addCountry(this.newCountryForm.value).subscribe(value => {
        if (value) {
          this.dialogRef.close(true);
        } else {
          this.errorMessage = 'Shit happened!';
        }
      });
    }
  }
}
