import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLeagueDialogComponent } from './add-league-dialog.component';
import {FormBuilder} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';

describe('AddLeagueDialogComponent', () => {
  let component: AddLeagueDialogComponent;
  let fixture: ComponentFixture<AddLeagueDialogComponent>;

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
    fixture = TestBed.createComponent(AddLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
