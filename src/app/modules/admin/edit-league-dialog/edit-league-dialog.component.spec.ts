import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeagueDialogComponent } from './edit-league-dialog.component';
import {AdminModule} from '../admin.module';
import {FirebaseService} from '../../../services/firebase.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';

describe('EditLeagueDialogComponent', () => {
  let component: EditLeagueDialogComponent;
  let fixture: ComponentFixture<EditLeagueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useClass: FirebaseStubService},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: 'league123'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
