import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminMainPageComponent} from './admin-main-page.component';
import {AdminModule} from '../admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BehaviorSubject, of} from 'rxjs';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialog} from '@angular/material/dialog';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';

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

    // СДЕЛАТЬ СТАБ FirebaseService!!!
    const fbSpy = jasmine.createSpyObj('fb',
      ['getCountries', 'getLeagues', 'getClubs', 'getPlayers', 'deleteCountry', 'deleteLeague', 'progress']);
    fbSpy.getCountries.and.returnValue(of(countries));
    fbSpy.getLeagues.and.returnValue(of(leagues));
    fbSpy.getClubs.and.returnValue(of(clubs));
    fbSpy.getPlayers.and.returnValue(of(players));
    fbSpy.deleteCountry.and.returnValue(of(true));
    fbSpy.deleteLeague.and.returnValue(of(true));
    fbSpy.progress.and.returnValue(new BehaviorSubject({
      loading: false,
      loaded: false
    }));
    TestBed.configureTestingModule({
      imports: [AdminModule, BrowserAnimationsModule],
      providers: [
        {provide: FirebaseService, useValue: fbSpy},
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
});
