import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

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
  const countries: Country[] = [
    {
      id: 'country123',
      nameEn: 'England',
      nameRu: 'Англия'
    }
  ];
  const leagues: League[] = [
    {
      altNameEn: 'Division 1',
      altNameRu: 'Division 1',
      country: '/countries/kOlF6fOXxzRdnvfkAu4M',
      countryNameEn: 'England',
      countryNameRu: 'Англия',
      id: 'league123',
      nameEn: 'Premier League',
      nameRu: 'Премьер Лига'
    }
  ];
  const clubs: Club[] = [
    {
      altNameEn: 'Red Devils',
      altNameRu: 'Красные Дьяволы',
      budget: 100,
      id: 'club123',
      league: '/leagues/NIDSxlgrIPnZUoKqiw10',
      leagueNameEn: 'Premier League',
      leagueNameRu: 'Премьер Лига',
      nameEn: 'Manchester United',
      nameRu: 'Манчестер Юнайтед',
      stadium: 80000
    }
  ];
  const players: Player[] = [
    {
      altNameEn: 'David Regea',
      altNameRu: 'Давид Регея',
      club: '/clubs/qhv1hyHqHQw7rYgGkYd3',
      clubNameEn: 'Manchester United',
      clubNameRu: 'Манчестер Юнайтед',
      id: 'player123',
      nameEn: 'David De Gea',
      nameRu: 'Давид Де Хеа',
      position: 'GK',
      power: 8.5
    }
  ];

  beforeEach(async(() => {
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
