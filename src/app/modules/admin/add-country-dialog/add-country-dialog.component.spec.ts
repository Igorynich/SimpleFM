import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCountryDialogComponent } from './add-country-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';

describe('AddCountryDialogComponent', () => {
  let component: AddCountryDialogComponent;
  let fixture: ComponentFixture<AddCountryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FirebaseService, useClass: FirebaseStubService},
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
