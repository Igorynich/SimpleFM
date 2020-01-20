import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {

  countries: Observable<any>;
  leagues: Observable<any>;

  displayedColumns: string[] = ['index', 'nameRu', 'nameEn', 'country', 'altNameRu', 'altNameEn'];

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.countries = this.afs.collection('countries').valueChanges();

    /*this.afs.collection('leagues').doc('NIDSxlgrIPnZUoKqiw10').get().subscribe(value => {
      console.log(value.data());
    });*/
  }

  getLeagues(): Observable<any> {
    return this.afs.collection('leagues').valueChanges().pipe(switchMap(value => {
      value.map((value1, index) => {
        const country: DocumentReference = value1.country;
        country.get().then((value2: DocumentSnapshot<any>) => value1.country = value2.data().nameRu);
        value1.index = index + 1;
      });
      return of(value);
    }));
  }

  loadAppropriateContent(ev: MatTabChangeEvent) {
    console.log(ev.index);
    if (ev.index === 1) {
      this.leagues = this.getLeagues();
    }
  }
}
