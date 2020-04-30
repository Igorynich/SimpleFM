import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
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
import {AddLeagueDialogComponent} from '../add-league-dialog/add-league-dialog.component';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@CleanSubscriptions()
@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit, OnDestroy {

  clubs: Observable<Club[]>;
  countries: Observable<Country[]>;
  leagues: Observable<League[]>;
  players: Observable<Player[]>;

  displayedColumnsClubs: string[] = ['index', 'nameRu', 'nameEn', 'leagueNameEn', 'altNameRu', 'altNameEn', 'budget', 'stadium', 'actions'];
  displayedColumnsCountries: string[] = ['index', 'nameRu', 'nameEn', 'actions'];
  displayedColumnsLeagues: string[] = ['index', 'nameRu', 'nameEn', 'countryNameEn', 'altNameRu', 'altNameEn', 'actions'];
  displayedColumnsPlayers: string[] = ['index', 'nameRu', 'nameEn', 'clubNameEn', 'altNameRu', 'altNameEn', 'position', 'power', 'actions'];

  pageClubs = 0;
  pagePlayers = 0;

  private _addDialog: Subscription;
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
    if (ev.index === 2) {
      this.clubs = this.fs.getClubs();
    }
    if (ev.index === 3) {
      this.players = this.fs.getPlayers();
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

    clearSubscription(this._addDialog);
    this._addDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  addNewLeague() {
    const dialogRef = this.dialog.open(AddLeagueDialogComponent, {
      width: '450px',
      height: '400px'
    });

    clearSubscription(this._addDialog);
    this._addDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
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

  editClubDialog(club: Club) {

  }

  deleteClub(club: Club) {

  }

  addNewClub() {

  }

  editPlayerDialog(player: Player) {

  }

  deletePlayer(player: Player) {

  }

  addNewPlayer() {

  }
}
