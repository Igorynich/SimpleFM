import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Country} from '../interfaces/country';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {League} from '../interfaces/league';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  progress = new BehaviorSubject({
    loading: false,
    loaded: false
  });

  constructor(private afs: AngularFirestore) { }

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

  getCountries(): Observable<Country[]> {
    this.progress.next({
      loading: true,
      loaded: false
    });
    console.log('Progress', this.progress);
    return this.afs.collection<Country>('countries').snapshotChanges().pipe(map(value => {
      console.log('countries', value);
      const countriesArray = [];
      value.map(item => {
        countriesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      this.progress.next({
        loading: false,
        loaded: true
      });
      console.log('countries with id', countriesArray);
      return countriesArray;
    }));
  }

  getLeagues(): Observable<League[]> {
    this.progress.next({
      loading: true,
      loaded: false
    });
    return this.afs.collection<Country>('leagues').snapshotChanges().pipe(map(value => {
      const leaguesArray = [];
      value.map(item => {
        leaguesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      this.progress.next({
        loading: false,
        loaded: true
      });
      console.log('leagues with id', leaguesArray);
      return leaguesArray;
    }));
  }
}
