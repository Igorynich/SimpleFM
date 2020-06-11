import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FirebaseService} from '../../services/firebase.service';
import {getBaseData, getClub, gotBaseData, gotClub, gotPlayers, scheduleGenerated} from '../actions/current-game.actions';
import {concatMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {CurrentGameState} from '../reducers/current-game.reducer';
import {combineLatest, of} from 'rxjs';
import {Club} from '../../interfaces/club';
import {
  AppState,
  getAllClubs,
  getAllCountries,
  getAllLeagues,
  selectCurrentClub,
  selectPlayersByClubsNameEn
} from '../selectors/current-game.selectors';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {CurrentGameService} from '../../services/current-game.service';

@Injectable()
export class CurrentGameEffects {

  getBaseData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBaseData),
      switchMap(action => {
        return combineLatest([
          this.fs.getCountries(),
          this.fs.getLeagues(),
          this.fs.getClubs(),
          this.fs.getPlayers()
        ]).pipe(take(1), map(([countries, leagues, clubs, players]) => {
          return gotBaseData({countries, leagues, clubs, players});
        }));
      })
    );
  });

  getClub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gotBaseData),
      tap(x => console.log('IN getCLUB$')),
      switchMap(action => this.store.pipe(select(getAllClubs)).pipe(take(1), map(clubs => {
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
      switchMap(([action, curClub]) => this.store.pipe(select(selectPlayersByClubsNameEn, {clubsNameEn: curClub.nameEn}))
        .pipe(take(1), map(players => {
          // TODO: move to currentGameService
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

  generateSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gotPlayers),
      switchMap(actions => {
        return combineLatest([
          this.store.pipe(select(getAllCountries)),
          this.store.pipe(select(getAllLeagues)),
          this.store.pipe(select(getAllClubs))]).pipe(map(([countries, leagues, clubs]) => {
            const leagueSchedules = this.game.generateLeagueSchedules(leagues, clubs);
            this.game.generateCupSchedules(countries, leagues, clubs);
            return scheduleGenerated({schedule: leagueSchedules});
        }));
      })
    ));

  constructor(private actions$: Actions,
              private fs: FirebaseService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private game: CurrentGameService) {
  }
}
