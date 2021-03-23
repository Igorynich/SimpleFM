import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {ConfirmationDialogData} from '../../interfaces/confirmation-dialog-data';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {SharedModule} from '../shared.module';

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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

  it('should display default yes and no buttons (Да и Нет)', () => {
    testData.yes.txt = null;
    testData.no.txt = null;
    fixture.detectChanges();
    const yesButton: DebugElement = debugEl.query(By.css('.yes-button'));
    const noButton: DebugElement = debugEl.query(By.css('.no-button'));
    // trim, cause material adds spaces
    expect(yesButton.nativeElement.textContent.trim()).toEqual('Да');
    expect(noButton.nativeElement.textContent.trim()).toEqual('Нет');
  });

  it('should display test yes and no buttons (Sure и Nope)', () => {
    testData.yes.txt = 'Sure';
    testData.no.txt = 'Nope';
    fixture.detectChanges();
    const yesButton: DebugElement = debugEl.query(By.css('.yes-button'));
    const noButton: DebugElement = debugEl.query(By.css('.no-button'));
    // trim, cause material adds spaces
    expect(yesButton.nativeElement.textContent.trim()).toEqual('Sure');
    expect(noButton.nativeElement.textContent.trim()).toEqual('Nope');
  });

  it('should use default yes and no button values (true и false)', () => {
    testData.yes.value = null;
    testData.no.value = null;
    fixture.detectChanges();
    const yesButton: DebugElement = debugEl.query(By.css('.yes-button'));
    const noButton: DebugElement = debugEl.query(By.css('.no-button'));
    const yesButtonDirective = yesButton.injector.get(MatDialogClose) as MatDialogClose;
    const noButtonDirective = noButton.injector.get(MatDialogClose) as MatDialogClose;
    expect(yesButtonDirective.dialogResult).toEqual(true);
    expect(noButtonDirective.dialogResult).toEqual(false);
  });

  it('should use test yes and no button values (+ и -)', () => {
    testData.yes.value = '+';
    testData.no.value = '-';
    fixture.detectChanges();
    const yesButton: DebugElement = debugEl.query(By.css('.yes-button'));
    const noButton: DebugElement = debugEl.query(By.css('.no-button'));
    const yesButtonDirective = yesButton.injector.get(MatDialogClose) as MatDialogClose;
    const noButtonDirective = noButton.injector.get(MatDialogClose) as MatDialogClose;
    expect(yesButtonDirective.dialogResult).toEqual('+');
    expect(noButtonDirective.dialogResult).toEqual('-');
  });
});
