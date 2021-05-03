import { Pipe, PipeTransform } from '@angular/core';
import {Match} from '../interfaces/match';
import {MatchStats1} from '../interfaces/match-stats1';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {resultSplitter} from '../utils/sort-roster';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub} from '../store/selectors/current-game.selectors';

@Pipe({
  name: 'matchResultClass'
})
export class MatchResultClassPipe implements PipeTransform {

  constructor(private store: Store<AppState>) {}

  transform(value: Match, stats: MatchStats1): Observable<{[className: string]: boolean}> {
    return this.store.select(selectCurrentClub).pipe(map(curClub => {
      const isHomeMatch = value.homeNameEn === curClub.nameEn;
      const resClass = {};
      if (stats?.result) {
        const [homeG, awayG] = resultSplitter(stats.result);
        if (homeG > awayG) {
          resClass['match-won'] = isHomeMatch;
        } else if (homeG < awayG) {
          resClass['match-won'] = !isHomeMatch;
        } else if (homeG === awayG) {
          resClass['match-draw'] = true;
        }
      }
      resClass['match-lost'] = !resClass['match-won'] && !resClass['match-draw'];
      return resClass;
    }));
  }

}
