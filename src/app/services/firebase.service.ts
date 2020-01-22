import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Country} from '../interfaces/country';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {League} from '../interfaces/league';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  getCountry(id: string): Observable<Country> {
    return this.afs.doc<Country>(`countries/${id}`).valueChanges();
  }

  updateCountry(id: string, data: Country): Observable<any> {
    const countryDoc = this.afs.doc<Country>(`countries/${id}`);
    return of(countryDoc.update(data));
  }

  getCountries(): Observable<Country[]> {
    return this.afs.collection<Country>('countries').snapshotChanges().pipe(map(value => {
      console.log('countries', value);
      const countriesArray = [];
      value.map(item => {
        countriesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      console.log('countries with id', countriesArray);
      return countriesArray;
    }));
  }

  getLeagues(): Observable<League[]> {
    return this.afs.collection<Country>('leagues').snapshotChanges().pipe(map(value => {
      const leaguesArray = [];
      value.map(item => {
        leaguesArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      return leaguesArray;
    }));
  }
}
