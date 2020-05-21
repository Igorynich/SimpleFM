import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {Country} from '../../interfaces/country';
import {map} from 'rxjs/operators';
import {League} from '../../interfaces/league';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {asyncData} from '../../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStubService {

  progress = new BehaviorSubject({
    loading: false,
    loaded: false
  });

  countries: Country[] = [
    {
      id: 'country123',
      nameEn: 'England',
      nameRu: 'Англия'
    }
  ];
  leagues: League[] = [
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
  clubs: Club[] = [
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
  players: Player[] = [
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

  constructor() {
  }

  addCountry(country: Country): Observable<any> {
    return asyncData(country);
  }

  addLeague(league: League): Observable<any> {
    return asyncData(league);
  }

  deleteCountry(id: string) {
    return asyncData(id);
  }

  deleteLeague(id: string) {
    return asyncData(id);
  }

  getCountry(id: string): Observable<Country> {
    return asyncData(this.countries[0]);
  }

  updateCountry(id: string, data: Country): Observable<any> {
    return asyncData(data);
  }

  getLeague(id: string): Observable<League> {
    return asyncData(this.leagues[0]);
  }

  updateLeague(id: string, data: League): Observable<any> {
    return asyncData(data);
  }

  getCountries(checkProgress = true): Observable<Country[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    return asyncData(this.countries).pipe(map(value => {
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      return value;
    }));
  }

  getLeagues(checkProgress = true): Observable<League[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    return asyncData(this.leagues).pipe(map(value => {
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      return value;
    }));
  }

  getClubs(checkProgress = true): Observable<Club[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    return asyncData(this.clubs).pipe(map(value => {
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      return value;
    }));
  }

  getPlayers(checkProgress = true): Observable<Player[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    return asyncData(this.players).pipe(map(value => {
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      return value;
    }));
  }
}
