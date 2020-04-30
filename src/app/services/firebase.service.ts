import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Country} from '../interfaces/country';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {League} from '../interfaces/league';
import {Club} from '../interfaces/club';

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
    return of(countryCollection.add(country)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  addLeague(league: League): Observable<any> {
    const leagueCollection = this.afs.collection<League>('leagues');
    return of(leagueCollection.add(league)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  deleteCountry(id: string) {
    const countryDoc = this.afs.doc<Country>(`countries/${id}`);
    return of(countryDoc.delete());
  }

  deleteLeague(id: string) {
    const leagueDoc = this.afs.doc<League>(`leagues/${id}`);
    return of(leagueDoc.delete());
  }

  getCountry(id: string): Observable<Country> {
    return this.afs.doc<Country>(`countries/${id}`).valueChanges();
  }

  updateCountry(id: string, data: Country): Observable<any> {
    const countryDoc = this.afs.doc<Country>(`countries/${id}`);
    return of(countryDoc.update(data));
  }

  getLeague(id: string): Observable<League> {
    console.log('getleague ', id);
    return this.afs.doc<League>(`leagues/${id}`).valueChanges();
  }

  updateLeague(id: string, data: League): Observable<any> {
    const leagueDoc = this.afs.doc<League>(`leagues/${id}`);
    return of(leagueDoc.update(data));
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
    }));
  }

  getClubs(checkProgress = true): Observable<Club[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    return this.afs.collection<League>('clubs', ref => ref.orderBy('nameEn')).snapshotChanges().pipe(map(value => {
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
    }));
  }
}
