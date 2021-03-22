import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentGameState} from '../store/selectors/current-game.selectors';
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from '../utils/local-storage';
import {map, take} from 'rxjs/operators';
import {CurrentGameState} from '../store/reducers/current-game.reducer';
import {Observable} from 'rxjs';
import {Country} from '../interfaces/country';
import {League} from '../interfaces/league';
import {Club} from '../interfaces/club';
import {Player} from '../interfaces/player';
import {objToArr} from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly STORAGE_NAME = 'simplefm';
  readonly STORAGE_FOR_DATA_NAME = 'simplefm_data';
  readonly SECONDS_TO_EXPIRATION = 2592000000;        // 30 days

  constructor(private userService: UserService,
              private store: Store<AppState>) {
  }

  saveStore(): Observable<void> {
    return this.store.select(selectCurrentGameState).pipe(take(1), map((curGame: CurrentGameState) => {
      console.warn('SAving to LS', curGame);
      /*const data = {
        ...curGame,
        finances: curGame.finances.entries(),
        seasonData: {
          clubPowers: curGame.seasonData.clubPowers.entries(),
          ticketPrices: curGame.seasonData.ticketPrices.entries()
        }
      };
      console.warn('SAving to LS1', data);*/
      setToLocalStorage(this.STORAGE_NAME, curGame);
    }));
  }

  getStore(): CurrentGameState | null {
    const storageData = getFromLocalStorage(this.STORAGE_NAME);
    return storageData || null;
  }

  clearStorage() {
    removeFromLocalStorage(this.STORAGE_NAME);
  }

  saveDBData(data: {
    countries: Country[],
    leagues: League[],
    clubs: Club[],
    players: Player[],
    scheduleShells: { [league_NumOfClubs: string]: any }
  }) {
    const dataToSave = {
    ...data,
    timestamp: new Date()
    };
    setToLocalStorage(this.STORAGE_FOR_DATA_NAME, dataToSave);
  }

  getSavedData(): {
    countries: Country[],
    leagues: League[],
    clubs: Club[],
    players: Player[],
    scheduleShells: { [league_NumOfClubs: string]: any }
  } | null {
    const storageData = getFromLocalStorage(this.STORAGE_FOR_DATA_NAME);
    // console.log('SavedData from LS', storageData);
    if (!!storageData) {
      const date = new Date();
      // @ts-ignore
      const secondsFromLastSave = date - new Date(storageData.timestamp);
      console.log('dates', storageData.timestamp, secondsFromLastSave);
      if (secondsFromLastSave >= this.SECONDS_TO_EXPIRATION) {
        return null;
      }
      const res = {
        countries: objToArr(storageData.countries),
        leagues: objToArr(storageData.leagues),
        clubs: objToArr(storageData.clubs),
        players: objToArr(storageData.players),
        scheduleShells: storageData.scheduleShells
      };
      return res;
    }
    return null;
  }

  encodeData<T>(data: T): string {
    return btoa(JSON.stringify(data));
  }

  decodeData<T>(data: string): T {
    return JSON.parse(atob(data));
  }
}
