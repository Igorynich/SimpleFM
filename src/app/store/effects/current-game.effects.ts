import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FirebaseService} from '../../services/firebase.service';
import {getClub, gotClub, gotPlayers} from '../actions/current-game.actions';
import {concatMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {CurrentGameState} from '../reducers/current-game.reducer';
import {of} from 'rxjs';
import {Club} from '../../interfaces/club';
import {AppState, selectCurrentClub} from '../selectors/current-game.selectors';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';

@Injectable()
export class CurrentGameEffects {

  getClub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getClub),
      tap(x => console.log('IN getCLUB$')),
      switchMap(action => this.fs.getClubs().pipe(take(1), map(clubs => {
        const randomNum = Math.ceil(Math.random() * 19).toFixed(0);
        console.log(randomNum);
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '550px',
          data: clubs[randomNum]
        });
        return gotClub({club: clubs[randomNum]});
      })))
    ));

  getPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gotClub),
      tap(x => console.log('IN getPlayers$')),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectCurrentClub)))
      )),
      tap(x => console.log('tap', x)),
      switchMap(([action, curClub]) => this.fs.getPlayersByClub(curClub.nameEn).pipe(map(players => {
        console.log(`Players of ${curClub.nameRu}`, players);
        // init sort for 4-4-2
        const gks = players.filter(pl => pl.position === 'GK').sort((a, b) => b.power - a.power);
        const defs = players.filter(pl => pl.position === 'D').sort((a, b) => b.power - a.power);
        const mids = players.filter(pl => pl.position === 'M').sort((a, b) => b.power - a.power);
        const forwards = players.filter(pl => pl.position === 'F').sort((a, b) => b.power - a.power);
        const currentPlayers = [
          ...gks.splice(0, 1),
          ...defs.splice(0, 4),
          ...mids.splice(0, 4),
          ...forwards.splice(0, 2),
          ...gks,
          ...defs,
          ...mids,
          ...forwards
        ];
        return gotPlayers({players: currentPlayers});
      })))
    ));

  constructor(private actions$: Actions,
              private fs: FirebaseService,
              private store: Store<AppState>,
              private dialog: MatDialog) {
  }
}