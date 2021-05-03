import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {Match} from '../interfaces/match';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub} from '../store/selectors/current-game.selectors';
import {Match1} from '../interfaces/match1';

@Pipe({
  name: 'isMyClub'
})
export class IsMyClubPipe implements PipeTransform {

  constructor(private store: Store<AppState>) {}

  transform(value: string, ...args: unknown[]): Observable<boolean> {
    return this.store.select(selectCurrentClub).pipe(map(curClub => curClub.nameEn === value || curClub.nameRu === value));
    /*return {
      home: this.store.select(selectCurrentClub).pipe(
          // @ts-ignore
          map(curClub => curClub.nameEn === (value.home ? value.home.nameEn : value.homeNameEn))),
      away: this.store.select(selectCurrentClub).pipe(
          // @ts-ignore
          map(curClub => curClub.nameEn === (value.away ? value.away.nameEn : value.awayNameEn)))
    };*/
  }

}
