import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Country} from '../interfaces/country';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {League} from '../interfaces/league';
import {Club} from '../interfaces/club';
import {Player} from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  progress = new BehaviorSubject({
    loading: false,
    loaded: false
  });

  constructor(private afs: AngularFirestore) { }

  addCountry(country: Country): Observable<any> {
    const countryCollection = this.afs.collection<Country>('countries');
    return from(countryCollection.add(country)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  addLeague(league: League): Observable<any> {
    const leagueCollection = this.afs.collection<League>('leagues');
    return from(leagueCollection.add(league)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  addClub(club: Club) {
    const clubCollection = this.afs.collection<Club>('clubs');
    return from(clubCollection.add(club)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  addPlayer(player: Player) {
    const playerCollection = this.afs.collection<Player>('players');
    return from(playerCollection.add(player)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  deleteCountry(id: string) {
    const countryDoc = this.afs.doc<Country>(`countries/${id}`);
    return from(countryDoc.delete());
  }

  deleteLeague(id: string) {
    const leagueDoc = this.afs.doc<League>(`leagues/${id}`);
    return from(leagueDoc.delete());
  }

  deleteClub(id: string) {
    const clubDoc = this.afs.doc<Club>(`clubs/${id}`);
    return from(clubDoc.delete());
  }

  deletePlayer(id: string) {
    const playerDoc = this.afs.doc<Player>(`players/${id}`);
    return from(playerDoc.delete());
  }

  getCountry(id: string): Observable<Country> {
    return this.afs.doc<Country>(`countries/${id}`).valueChanges();
  }

  updateCountry(id: string, data: Country): Observable<any> {
    const countryDoc = this.afs.doc<Country>(`countries/${id}`);
    return from(countryDoc.update(data));
  }

  getLeague(id: string): Observable<League> {
    console.log('getleague ', id);
    return this.afs.doc<League>(`leagues/${id}`).valueChanges();
  }

  getClub(id: string): Observable<Club> {
    console.log('getClub ', id);
    return this.afs.doc<Club>(`clubs/${id}`).valueChanges();
  }

  getPlayer(id: string): Observable<Player> {
    console.log('getPlayer ', id);
    return this.afs.doc<Player>(`players/${id}`).valueChanges();
  }

  updateLeague(id: string, data: League): Observable<any> {
    const leagueDoc = this.afs.doc<League>(`leagues/${id}`);
    return from(leagueDoc.update(data));
  }

  updateClub(id: string, data: Club) {
    const clubDoc = this.afs.doc<Club>(`clubs/${id}`);
    return from(clubDoc.update(data));
  }

  updatePlayer(id: string, data: Player) {
    const playerDoc = this.afs.doc<Player>(`players/${id}`);
    return from(playerDoc.update(data));
  }

  getCountries(checkProgress = true): Observable<Country[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
      console.log('Progress', this.progress);
    }

    return this.afs.collection<Country>('countries', ref => ref.orderBy('nameEn')).snapshotChanges().pipe(map(value => {
      console.log('countries', value);
      const countriesArray = [];
      value.map(item => {
        countriesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      console.log('countries with id', countriesArray);
      return countriesArray;
    }), catchError(err => {
      console.log('Err countries', err);
      this.progress.next({
        loading: false,
        loaded: false
      });
      return of([]);
    }));
  }

  getLeagues(checkProgress = true): Observable<League[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    return this.afs.collection<League>('leagues', ref => ref.orderBy('altNameEn')).snapshotChanges().pipe(map(value => {
      const leaguesArray = [];
      value.map(item => {
        leaguesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      console.log('leagues with id', leaguesArray);
      return leaguesArray;
    }), catchError(err => {
      console.log('Err leagues', err);
      this.progress.next({
        loading: false,
        loaded: false
      });
      return of([]);
    }));
  }

  getClubs(checkProgress = true): Observable<Club[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    return this.afs.collection<Club>('clubs', ref => ref.orderBy('nameEn')).snapshotChanges().pipe(map(value => {
      const clubsArray = [];
      value.map(item => {
        clubsArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      console.log('clubs with id', clubsArray);
      return clubsArray;
    }), catchError(err => {
      console.log('Err clubs', err);
      this.progress.next({
        loading: false,
        loaded: false
      });
      return of([]);
    }));
  }

  getPlayers(checkProgress = true): Observable<Player[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    return this.afs.collection<Player>('players', ref => ref.orderBy('nameEn')).snapshotChanges().pipe(map(value => {
      const playersArray = [];
      value.map(item => {
        playersArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      console.log('players with id', playersArray);
      return playersArray;
    }), catchError(err => {
      console.log('Err players', err);
      this.progress.next({
        loading: false,
        loaded: false
      });
      return of([]);
    }));
  }
}
