import { Pipe, PipeTransform } from '@angular/core';
import {AppState, getCupRoundsNum} from '../store/selectors/current-game.selectors';
import {map, take} from 'rxjs/operators';
import {leagueTourToWeek} from '../utils/sort-roster';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Pipe({
  name: 'leagueTourToWeek'
})
export class LeagueTourToWeekPipe implements PipeTransform {

  constructor(private store: Store<AppState>) {}

  transform(value: number, ...args: unknown[]): Observable<number> {
    return this.store.select(getCupRoundsNum).pipe(map(cRounds => leagueTourToWeek(value, cRounds) + 1));
  }

}
