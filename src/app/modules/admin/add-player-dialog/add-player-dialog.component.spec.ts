import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPlayerDialogComponent } from './add-player-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('AddPlayerDialogComponent', () => {
  let component: AddPlayerDialogComponent;
  let fixture: ComponentFixture<AddPlayerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useClass: FirebaseStubService},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: 'player123'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
