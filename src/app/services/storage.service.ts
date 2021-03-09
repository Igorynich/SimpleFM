import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentGameState} from '../store/selectors/current-game.selectors';
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from '../utils/local-storage';
import {map, take} from 'rxjs/operators';
import {CurrentGameState} from '../store/reducers/current-game.reducer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly STORAGE_NAME = 'simplefm';

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

  encodeData<T>(data: T): string {
    return btoa(JSON.stringify(data));
  }

  decodeData<T>(data: string): T {
    return JSON.parse(atob(data));
  }
}
