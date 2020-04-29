import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {EditCountryDialogComponent} from '../edit-country-dialog/edit-country-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {EditLeagueDialogComponent} from '../edit-league-dialog/edit-league-dialog.component';
import {AddCountryDialogComponent} from '../add-country-dialog/add-country-dialog.component';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {switchMap} from 'rxjs/operators';
import {CleanSubscriptions, clearSubscription} from '../../../utils/clean-subscriptions';

@CleanSubscriptions()
@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit, OnDestroy {

  countries: Observable<Country[]>;
  leagues: Observable<League[]>;

  displayedColumnsCountries: string[] = ['index', 'nameRu', 'nameEn', 'actions'];
  displayedColumnsLeagues: string[] = ['index', 'nameRu', 'nameEn', 'countryNameEn', 'altNameRu', 'altNameEn', 'actions'];

  private _delDialog: Subscription;
  private _editDialog: Subscription;

  constructor(public fs: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.countries = this.fs.getCountries();
  }

  ngOnDestroy(): void {
    // CleanSubscriptions
  }

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

    clearSubscription(this._editDialog);
    this._editDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  editLeagueDialog(league: League) {
    console.log('EditLeagueDialog111', league);
    const dialogRef = this.dialog.open(EditLeagueDialogComponent, {
      width: '450px',
      height: '400px',
      data: league.id
    });

    clearSubscription(this._editDialog);
    this._editDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  addNewCountry() {
    const dialogRef = this.dialog.open(AddCountryDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  addNewLeague() {

  }

  deleteCountry(country: Country) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    clearSubscription(this._delDialog);
    this._delDialog = dialogRef.afterClosed().pipe(switchMap(result => {
      console.log('The dialog was closed', result);
      if (result) {
        return this.fs.deleteCountry(country.id);
      }
      return of(null);
    })).subscribe();
  }

  deleteLeague(league: League) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    clearSubscription(this._delDialog);
    this._delDialog = dialogRef.afterClosed().pipe(switchMap(result => {
      console.log('The dialog was closed', result);
      if (result) {
        return this.fs.deleteLeague(league.id);
      }
      return of(null);
    })).subscribe();
  }
}
