import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {combineLatest, Observable, of, Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Country} from '../../../interfaces/country';
import {League} from '../../../interfaces/league';
import {EditCountryDialogComponent} from '../edit-country-dialog/edit-country-dialog.component';
import {FirebaseService} from '../../../services/firebase.service';
import {EditLeagueDialogComponent} from '../edit-league-dialog/edit-league-dialog.component';
import {AddCountryDialogComponent} from '../add-country-dialog/add-country-dialog.component';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {CleanSubscriptions, clearSubscription} from '../../../utils/clean-subscriptions';
import {AddLeagueDialogComponent} from '../add-league-dialog/add-league-dialog.component';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';
import {AddClubDialogComponent} from '../add-club-dialog/add-club-dialog.component';
import {EditClubDialogComponent} from '../edit-club-dialog/edit-club-dialog.component';
import {AddPlayerDialogComponent} from '../add-player-dialog/add-player-dialog.component';
import {EditPlayerDialogComponent} from '../edit-player-dialog/edit-player-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {POSITIONS} from '../../../constants/positions';
import {randomInteger} from '../../../utils/helpers';
import {round} from 'lodash';

@CleanSubscriptions()
@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.css']
})
export class AdminMainPageComponent implements OnInit, OnDestroy {

  clubs: Observable<Club[]>;
  filteredClubs$: Observable<Club[]>;
  countries: Observable<Country[]>;
  leagues: Observable<League[]>;
  players: Player[];
  playersDS: MatTableDataSource<Player>;
  playersChanged$ = new Subject();
  positions = POSITIONS;

  @ViewChild('plPaginator', {read: MatPaginator, static: false}) playersPaginator: MatPaginator;
  @ViewChild('plTable', {read: MatSort, static: false}) playersSort: MatSort;

  displayedColumnsClubs: string[] = ['index', 'nameRu', 'nameEn', 'leagueNameEn', 'altNameRu', 'altNameEn', 'budget', 'stadium', 'actions'];
  displayedColumnsCountries: string[] = ['index', 'nameRu', 'nameEn', 'actions'];
  displayedColumnsLeagues: string[] = ['index', 'nameRu', 'nameEn', 'countryNameEn', 'altNameRu', 'altNameEn', 'actions'];
  displayedColumnsPlayers: string[] = ['index', 'nameRu', 'nameEn', 'clubNameEn', 'altNameRu', 'altNameEn', 'position', 'power', 'actions'];

  pageClubs = 1;
  pagePlayers = 0;

  clubSearch: FormControl;
  leagueSearch: FormControl;
  clubNameSearch: FormControl;
  nameSearch: FormControl;
  positionSearch: FormControl;

  fillPower: {from: FormControl, to: FormControl};


  private _addDialog: Subscription;
  private _delDialog: Subscription;
  private _editDialog: Subscription;
  private _playersSub: Subscription;
  private _playersDSSub: Subscription;
  private _clubSearchSub: Subscription;
  private _nameSearchSub: Subscription;
  private _positionSearchSub: Subscription;
  private _fillPowerSub: Subscription;


  constructor(public fs: FirebaseService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fillPower = {
      from: new FormControl(0),
      to: new FormControl(6)
    };
    this.leagueSearch = new FormControl(null);
    this.clubSearch = new FormControl(null);
    this.clubNameSearch = new FormControl('');
    this.nameSearch = new FormControl('');
    this.positionSearch = new FormControl(null);
    this._nameSearchSub = this.nameSearch.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe(value => {
      this.filterPlayers(this.players);
    });
    this.clubs = this.fs.getClubs();
    this.filteredClubs$ = combineLatest([
      this.fs.getClubs(),
      this.leagueSearch.valueChanges.pipe(startWith(this.leagueSearch.value)),
      this.clubNameSearch.valueChanges.pipe(startWith(this.clubNameSearch.value))
    ]).pipe(distinctUntilChanged(), debounceTime(300), map(([clubs, leagueNameEn, clubName]: [Club[], string, string]) => {
      // console.log('Searching clubs', clubs, leagueNameEn, clubName);
      // console.log('Searching clubs1', this.leagueSearch.value, this.clubNameSearch.value);
      const clubNameX = (clubName || this.clubNameSearch.value).toLowerCase();
      const leagueNameX = leagueNameEn || this.leagueSearch.value;
      return clubs.filter(cl => {
        if (!!leagueNameX && !!clubNameX) {
          return cl.leagueNameEn === leagueNameX &&
            (cl.nameRu.toLowerCase().includes(clubNameX) || cl.nameEn.toLowerCase().includes(clubNameX));
        } else if (!!leagueNameX) {
          return cl.leagueNameEn === leagueNameX;
        } else if (!!clubNameX) {
          return (cl.nameRu.toLowerCase().includes(clubNameX) || cl.nameEn.toLowerCase().includes(clubNameX));
        }
        return true;
      });
    }));
    this._clubSearchSub = this.clubSearch.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe(value => {
      this.filterPlayers(this.players);
    });
    this._positionSearchSub = this.positionSearch.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe(value => {
      this.filterPlayers(this.players);
    });
    this.countries = this.fs.getCountries();
    this.leagues = this.fs.getLeagues();

    this._playersDSSub = this.playersChanged$.subscribe((value: Player[]) => {
      this.playersDS = new MatTableDataSource(value);
      this.playersDS.paginator = this.playersPaginator;
      this.playersDS.sort = this.playersSort;
      // this.nameSearch.setValue(this.nameSearch.value);    // forcing search value change on ds update
    });
  }

  ngOnDestroy(): void {
    // CleanSubscriptions
  }

  loadAppropriateContent(ev: MatTabChangeEvent) {
    console.log(ev.index);
    /*if (ev.index === 1 && !this.leagues) {
      this.leagues = this.fs.getLeagues();
    }*/
    /*if (ev.index === 2 && !this.clubs) {
      this.clubs = this.fs.getClubs();
    }*/
    if (ev.index === 3 && !this._playersSub) {
      this._playersSub = this.fs.getPlayers().pipe(tap((x: Player[]) => {
        this.players = x;
        // this.playersChanged$.next(x);
        this.filterPlayers(x);
      })).subscribe();
    }
  }

  filterPlayers(players: Player[]) {
    let filteredPlayers: Player[] = players;
    if (this.nameSearch.value) {
      const nameSearchValue = this.nameSearch.value.trim().toLowerCase();
      filteredPlayers = filteredPlayers.filter(value1 => value1.nameEn.toLowerCase().includes(nameSearchValue)
        || value1.nameRu.toLowerCase().includes(nameSearchValue) || value1.altNameEn.toLowerCase().includes(nameSearchValue)
        || value1.altNameRu.toLowerCase().includes(nameSearchValue));
    }
    if (this.clubSearch.value) {
      const clubSearchValue = this.clubSearch.value;
      filteredPlayers = filteredPlayers.filter(value1 => value1.clubNameEn === clubSearchValue);
    }
    if (this.positionSearch.value) {
      const positionSearchValue = this.positionSearch.value;
      filteredPlayers = filteredPlayers.filter(value1 => value1.position === positionSearchValue);
    }
    this.playersChanged$.next(filteredPlayers);
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
    console.log('EditClubDialog', club);
    const dialogRef = this.dialog.open(EditClubDialogComponent, {
      width: '450px',
      height: '500px',
      data: club.id
    });

    clearSubscription(this._editDialog);
    this._editDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deleteClub(club: Club) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    clearSubscription(this._delDialog);
    this._delDialog = dialogRef.afterClosed().pipe(switchMap(result => {
      console.log('The dialog was closed', result);
      if (result) {
        return this.fs.deleteClub(club.id);
      }
      return of(null);
    })).subscribe();
  }

  addNewClub() {
    const dialogRef = this.dialog.open(AddClubDialogComponent, {
      width: '450px',
      height: '500px'
    });

    clearSubscription(this._addDialog);
    this._addDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  editPlayerDialog(player: Player) {
    console.log('EditPlayerDialog', player);
    const dialogRef = this.dialog.open(EditPlayerDialogComponent, {
      width: '450px',
      height: '520px',
      data: player.id
    });

    clearSubscription(this._editDialog);
    this._editDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deletePlayer(player: Player) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });

    clearSubscription(this._delDialog);
    this._delDialog = dialogRef.afterClosed().pipe(switchMap(result => {
      console.log('The dialog was closed', result);
      if (result) {
        return this.fs.deletePlayer(player.id);
      }
      return of(null);
    })).subscribe();
  }

  addNewPlayer() {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      width: '450px',
      height: '550px'
    });

    clearSubscription(this._addDialog);
    this._addDialog = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  createRandomPlayer() {

  }

  fillPowers() {
    console.log('Players', this.players);
    const unpoweredPlayers = this.players.filter(value => !value.power);
    unpoweredPlayers.forEach(value => {
      const randomPower = +(Math.random() * 10).toFixed(1);
      console.log(randomPower);
      // value.power = randomPower;
      this.fs.updatePlayer(value.id, {power: randomPower}).subscribe();
    });
  }

  fillPowersFiltered() {
    this.playersChanged$.pipe(take(1)).subscribe((players: Player[]) => {
      players.forEach(pl => {
        if (!pl.power) {
          if (this.fillPower.from.value < this.fillPower.to.value) {
            const random = round(randomInteger(this.fillPower.from.value * 10, this.fillPower.to.value * 10) / 10, 1);
            this.fs.updatePlayer(pl.id, {power: random}).subscribe();
          } else {
            console.error(`${this.fillPower.from.value} >= ${this.fillPower.to.value} - NOT GOOD`);
          }
        }
      });
    });
    this.filterPlayers(this.players);
  }
}
