import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmationDialogData} from '../../interfaces/confirmation-dialog-data';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let debugEl: DebugElement;
  const testDataStub: ConfirmationDialogData = {
    header: 'TestHeader',
    yes: {
      txt: 'Sure',
      value: '+'
    },
    no: {
      txt: 'Nope',
      value: '-'
    }
  };
  let testData: ConfirmationDialogData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [{provide: MAT_DIALOG_DATA, useValue: testDataStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    testData = TestBed.inject(MAT_DIALOG_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display TestHeader', () => {
    testData.header = 'TestHeader';
    fixture.detectChanges();
    const header: DebugElement = debugEl.query(By.css('h3'));
    expect(header.nativeElement.textContent).toEqual('TestHeader');
  });

  it('should display default header (Вы уверены?)', () => {
    testData.header = null;
    fixture.detectChanges();
    const header: DebugElement = debugEl.query(By.css('h3'));
    expect(header.nativeElement.textContent).toEqual('Вы уверены?');
  });
});
