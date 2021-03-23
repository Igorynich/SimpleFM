import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import {AdminMainPageComponent} from './admin-main-page.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialog} from '@angular/material/dialog';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';
import {FirebaseStubService} from '../../../services/stubs/firebase-stub.service';

describe('AdminMainPageComponent', () => {
  let component: AdminMainPageComponent;
  let fixture: ComponentFixture<AdminMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useClass: FirebaseStubService},
        MatDialog
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 country with id=country123', fakeAsync(() => {
    component.countries.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0].id).toMatch('country123');
    });
  }));
});
