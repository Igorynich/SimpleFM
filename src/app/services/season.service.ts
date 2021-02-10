import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/selectors/current-game.selectors';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private store: Store<AppState>) { }

  endCurrentSeason() {
    console.warn('ENDING CURRENT SEASON');
    // prize money
    // player power change
    // division rotations

  }
}
