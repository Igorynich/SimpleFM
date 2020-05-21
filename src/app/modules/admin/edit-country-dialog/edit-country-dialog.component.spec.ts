import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryDialogComponent } from './edit-country-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {Country} from '../../../interfaces/country';

describe('EditCountryDialogComponent', () => {
  let component: EditCountryDialogComponent;
  let fixture: ComponentFixture<EditCountryDialogComponent>;
  const country: Country = {
    nameEn: 'England',
    nameRu: 'Англия'
  };

  beforeEach(async(() => {
    const fbSpy = jasmine.createSpyObj('fb', ['getCountry', 'updateCountry']);
    fbSpy.getCountry.and.returnValue(of(country));
    fbSpy.updateCountry.and.returnValue(of(true));
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useValue: fbSpy},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: '22'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
