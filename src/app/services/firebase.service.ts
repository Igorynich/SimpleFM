import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import {Country} from '../interfaces/country';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {League} from '../interfaces/league';
import {Club} from '../interfaces/club';
import {Player} from '../interfaces/player';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {StorageService} from './storage.service';

export class PlayerQueryObj {
  club?: string;
  name?: string;
  position?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  progress = new BehaviorSubject({
    loading: false,
    loaded: false
  });

  lastCreatedPlayer: Player;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private storage: StorageService) {
  }

  login(): Observable<any> {
    // return from(this.auth.signInWithEmailAndPassword(email, password));
    // this.auth.signInWithPopup(new this.auth.GoogleAuthProvider());
    return from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getScheduleShells(refreshCache = false): Observable<any> {
    if (!refreshCache) {
      const storedData = this.storage.getSavedData();
      if (!!storedData?.scheduleShells) {
        return of(storedData.scheduleShells);
      }
    }
    return this.afs.collection(`schedules`).snapshotChanges().pipe(map(value => {
      console.log('Schedules Collection', value);
      const scheduleEntity = {};
      value.forEach(item => {
        scheduleEntity[item.payload.doc.id] = item.payload.doc.data();
      });
      console.log('scheduleEntity', scheduleEntity);
      return scheduleEntity;
    }));
  }

  getLeagueScheduleShell(numOfTeams: number): Observable<any> {
    return this.afs.doc(`schedules/league_${numOfTeams}`).valueChanges();
  }

  addFeedback(data: {text: string}) {
    const collection = this.afs.collection<{text: string}>('feedback');
    return from(collection.add(data)).pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

  addBugReport(data: {text: string, save: {data: any, stats: any}}) {
    // const splitData = data.save.match(/.{1,128}/g);
    // console.log('splitData', splitData, splitData.length, data.save.length, );
    const collection = this.afs.collection<{text: string, save: {data: any, stats: any}, date: Date}>('bugs');
    return from(collection.add({text: data.text, save: {data: data.save.data, stats: data.save.stats}, date: new Date()}))
      .pipe(map(value => {
      console.log(value);
      return value;
    }));
  }

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
    this.lastCreatedPlayer = player;
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

  updatePlayer(id: string, data: Player | { power: number }) {
    const playerDoc = this.afs.doc<Player>(`players/${id}`);
    return from(playerDoc.update(data));
  }

  getCountries(refreshCache = false, checkProgress = true): Observable<Country[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
      console.log('Progress', this.progress);
    }
    if (!refreshCache) {
      const storedData = this.storage.getSavedData();
      if (!!storedData?.countries) {
        if (checkProgress) {
          this.progress.next({
            loading: false,
            loaded: true
          });
        }
        return of(storedData.countries);
      }
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

  getLeagues(refreshCache = false, checkProgress = true): Observable<League[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    if (!refreshCache) {
      const storedData = this.storage.getSavedData();
      if (!!storedData?.leagues) {
        if (checkProgress) {
          this.progress.next({
            loading: false,
            loaded: true
          });
        }
        return of(storedData.leagues);
      }
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

  getClubs(refreshCache = false, checkProgress = true): Observable<Club[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }

    if (!refreshCache) {
      const storedData = this.storage.getSavedData();
      if (!!storedData?.clubs) {
        if (checkProgress) {
          this.progress.next({
            loading: false,
            loaded: true
          });
        }
        return of(storedData.clubs);
      }
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

  getPlayers(refreshCache = false, checkProgress = true, query: PlayerQueryObj = {}): Observable<Player[]> {
    if (checkProgress) {
      this.progress.next({
        loading: true,
        loaded: false
      });
    }
    if (!refreshCache) {
      const storedData = this.storage.getSavedData();
      if (!!storedData?.players) {
        if (checkProgress) {
          this.progress.next({
            loading: false,
            loaded: true
          });
        }
        return of(storedData.players);
      }
    }

    return this.afs.collection<Player>('players', (ref: CollectionReference) => {
      return ref.orderBy('position');
    }).snapshotChanges().pipe(map(value => {
      const playersArray: Player[] = value.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
      if (checkProgress) {
        this.progress.next({
          loading: false,
          loaded: true
        });
      }
      // TODO remove after b/e done
      playersArray.forEach(pl => {
        const duplicates = playersArray.filter(value1 => value1.nameRu === pl.nameRu || value1.nameEn === pl.nameEn);
        if (duplicates.length > 1) {
          console.error('DUPLICATE PLAYERS', duplicates);
        }
        if (pl.power <= 0) {
          console.error('PLAYER POWER 0', pl);
        }
      });
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

  getPlayersByClub(clubNameEn: string): Observable<Player[]> {
    this.progress.next({
      loading: true,
      loaded: false
    });
    return this.afs.collection<Player>('players', (ref: CollectionReference) => {
      return ref.where('clubNameEn', '==', clubNameEn);
    }).snapshotChanges().pipe(map(value => {
      const playersArray = [];
      value.map(item => {
        playersArray.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });
      this.progress.next({
        loading: false,
        loaded: true
      });
      console.log('players by club with id', clubNameEn, playersArray);
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
