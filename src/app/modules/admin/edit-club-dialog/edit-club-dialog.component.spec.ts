import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClubDialogComponent } from './edit-club-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('EditClubDialogComponent', () => {
  let component: EditClubDialogComponent;
  let fixture: ComponentFixture<EditClubDialogComponent>;

  beforeEach(async(() => {
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
    fixture = TestBed.createComponent(EditClubDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
