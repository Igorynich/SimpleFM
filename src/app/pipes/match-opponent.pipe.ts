import { Pipe, PipeTransform } from '@angular/core';
import {Match} from '../interfaces/match';
import {Observable, of} from 'rxjs';
import {Club} from '../interfaces/club';
import {map, switchMap} from 'rxjs/operators';
import {AppState, selectClubByClubsNameEn, selectCurrentClub} from '../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';

@Pipe({
  name: 'matchOpponent'
})
export class MatchOpponentPipe implements PipeTransform {

  constructor(private store: Store<AppState>) {}

  transform(value: Match, ...args: unknown[]): {club: Observable<Club | null>, field: Observable<'H' | 'A'> | null} {
    if (!value) {
      return null;
    }
    if (!value.awayNameEn || !value.homeNameEn) {
      return {
        club: of(null),
        field: null
      };
    }
    return {
      club: this.store.select(selectCurrentClub).pipe(switchMap(curClub => {
        return value.homeNameEn === curClub.nameEn ?
            this.store.select(selectClubByClubsNameEn, {clubsNameEn: value.awayNameEn}) :
            this.store.select(selectClubByClubsNameEn, {clubsNameEn: value.homeNameEn});
      })),
      field: this.store.select(selectCurrentClub).pipe(map(curClub => value.homeNameEn === curClub.nameEn ? 'H' : 'A'))
    };
  }

}
