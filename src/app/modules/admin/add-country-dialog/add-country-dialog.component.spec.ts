import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryDialogComponent } from './add-country-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('AddCountryDialogComponent', () => {
  let component: AddCountryDialogComponent;
  let fixture: ComponentFixture<AddCountryDialogComponent>;

  beforeEach(async(() => {
    const fbSpy = jasmine.createSpyObj('fb', ['addCountry']);
    fbSpy.addCountry.and.returnValue(of(true));
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FirebaseService, useValue: fbSpy},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
