import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerDialogComponent } from './edit-player-dialog.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('EditPlayerDialogComponent', () => {
  let component: EditPlayerDialogComponent;
  let fixture: ComponentFixture<EditPlayerDialogComponent>;

  beforeEach(async(() => {
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
    fixture = TestBed.createComponent(EditPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
