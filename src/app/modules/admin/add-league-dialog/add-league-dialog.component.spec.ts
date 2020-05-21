import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeagueDialogComponent } from './add-league-dialog.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {Country} from '../../../interfaces/country';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AddLeagueDialogComponent', () => {
  let component: AddLeagueDialogComponent;
  let fixture: ComponentFixture<AddLeagueDialogComponent>;
  const countries: Country[] = [
    {
      nameEn: 'England',
      nameRu: 'Англия'
    }
  ];

  beforeEach(async(() => {
    const fbSpy = jasmine.createSpyObj('fb', ['getCountries', 'addLeague']);
    fbSpy.getCountries.and.returnValue(of(countries));
    fbSpy.addLeague.and.returnValue(of(true));
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FirebaseService, useValue: fbSpy},
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
