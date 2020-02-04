import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MatDialog, MatTabChangeEvent} from '@angular/material';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {EditCountryDialogComponent} from '../edit-country-dialog/edit-country-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {EditLeagueDialogComponent} from '../edit-league-dialog/edit-league-dialog.component';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit {

  countries: Observable<Country[]>;
  leagues: Observable<League[]>;

  displayedColumnsCountries: string[] = ['index', 'nameRu', 'nameEn', 'actions'];
  displayedColumnsLeagues: string[] = ['index', 'nameRu', 'nameEn', 'countryNameEn', 'altNameRu', 'altNameEn', 'actions'];

  constructor(private fs: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.countries = this.fs.getCountries();
    /*this.countries1 = this.afs.collection<Country>('countries').snapshotChanges().subscribe((value: DocumentChangeAction<Country>[]) => {
      value.
      console.log(value);
    });*/

    /*this.afs.collection('leagues').doc('NIDSxlgrIPnZUoKqiw10').get().subscribe(value => {
      console.log(value.data());
    });*/
  }

  /*getLeagues(): Observable<any> {
    return this.afs.collection('leagues').valueChanges().pipe(switchMap(value => {
      value.map((value1, index) => {
        const country: DocumentReference = value1['country'];
        country.get().then((value2: DocumentSnapshot<any>) => value1['country'] = value2.data().nameRu);
        value1['index'] = index + 1;
      });
      return of(value);
    }));
  }*/

  loadAppropriateContent(ev: MatTabChangeEvent) {
    console.log(ev.index);
    if (ev.index === 1) {
      this.leagues = this.fs.getLeagues();
    }
  }

  editCountryDialog(country: Country) {
    console.log('EditCountryDialog', country);
    const dialogRef = this.dialog.open(EditCountryDialogComponent, {
      width: '350px',
      data: country.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  editLeagueDialog(league: League) {
    console.log('EditLeagueDialog111', league);
    const dialogRef = this.dialog.open(EditLeagueDialogComponent, {
      width: '350px',
      data: league.id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}