import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddClubDialogComponent } from './add-club-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('AddClubDialogComponent', () => {
  let component: AddClubDialogComponent;
  let fixture: ComponentFixture<AddClubDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useClass: FirebaseStubService},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: 'club123'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
