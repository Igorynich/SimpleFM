import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeagueDialogComponent } from './edit-league-dialog.component';
import {AdminModule} from '../admin.module';
import {FirebaseService} from '../../../services/firebase.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EditLeagueDialogComponent', () => {
  let component: EditLeagueDialogComponent;
  let fixture: ComponentFixture<EditLeagueDialogComponent>;
  const countries: Country[] = [
    {
      nameEn: 'England',
      nameRu: 'Англия'
    }
  ];
  const league: League = {
    altNameEn: 'Division 1',
    altNameRu: 'Division 1',
    country: '/countries/kOlF6fOXxzRdnvfkAu4M',
    countryNameEn: 'England',
    countryNameRu: 'Англия',
    nameEn: 'Premier League',
    nameRu: 'Премьер Лига'
  };

  beforeEach(async(() => {
    const fbSpy = jasmine.createSpyObj('fb', ['getCountries', 'getLeague', 'updateLeague']);
    fbSpy.getCountries.and.returnValue(of(countries));
    fbSpy.getLeague.and.returnValue(of(league));
    fbSpy.updateLeague.and.returnValue(of(true));
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useValue: fbSpy},
        FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: '11'}
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
