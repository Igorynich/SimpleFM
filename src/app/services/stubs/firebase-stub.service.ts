import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {Country} from '../../interfaces/country';
import {map} from 'rxjs/operators';
import {League} from '../../interfaces/league';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {asyncData} from '../../utils/helpers';
import {TEST_CLUBS, TEST_COUNTRIES, TEST_LEAGUES, TEST_PLAYERS} from '../../constants/test-data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStubService {

  progress = new BehaviorSubject({
    loading: false,
    loaded: false
  });

  constructor() {
  }

  addCountry(country: Country): Observable<any> {
    return asyncData(country);
  }

  addLeague(league: League): Observable<any> {
    return asyncData(league);
  }

  addClub(club: Club): Observable<any> {
    return asyncData(club);
  }

  addPlayer(player: Player): Observable<any> {
    return asyncData(player);
  }

  deleteCountry(id: string) {
    return asyncData(id);
  }

  deleteLeague(id: string) {
    return asyncData(id);
  }

  deleteClub(id: string) {
    return asyncData(id);
  }

  deletePlayer(id: string) {
    return asyncData(id);
  }

  getCountry(id: string): Observable<Country> {
    return asyncData(TEST_COUNTRIES[0]);
  }

  updateCountry(id: string, data: Country): Observable<any> {
    return asyncData(data);
  }

  getLeague(id: string): Observable<League> {
    return asyncData(TEST_LEAGUES[0]);
  }

  getClub(id: string): Observable<Club> {
    return asyncData(TEST_CLUBS[0]);
  }

  getPlayer(id: string): Observable<Player> {
    return asyncData(TEST_PLAYERS[0]);
  }

  updateLeague(id: string, data: League): Observable<any> {
    return asyncData(data);
  }

  updateClub(id: string, data: Club): Observable<any> {
    return asyncData(data);
  }

  updatePlayer(id: string, data: Player): Observable<any> {
    return asyncData(data);
  }

  getCountries(checkProgress = true): Observable<Country[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    return asyncData(TEST_COUNTRIES).pipe(map(value => {
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
    return asyncData(TEST_LEAGUES).pipe(map(value => {
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
    return asyncData(TEST_CLUBS).pipe(map(value => {
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
    return asyncData(TEST_PLAYERS).pipe(map(value => {
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
