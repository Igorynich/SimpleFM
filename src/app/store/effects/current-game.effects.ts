import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FirebaseService} from '../../services/firebase.service';
import {getBaseData, getClub, gotBaseData, gotClub, gotPlayers, scheduleGenerated, tablesGenerated} from '../actions/current-game.actions';
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
import {sortClubsRoster} from '../../utils/sort-roster';

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
          this.fs.getPlayers(),
          this.fs.getScheduleShells()
        ]).pipe(take(1), map(([countries, leagues, clubs, players, scheduleShells]) => {
          return gotBaseData({countries, leagues, clubs, players, scheduleShells});
        }));
      })
    );
  });

  getClub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gotBaseData),
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
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectCurrentClub)))
      )),
      switchMap(([action, curClub]) => this.store.pipe(select(selectPlayersByClubsNameEn, {clubsNameEn: curClub.nameEn}))
        .pipe(take(1), map(players => {
          // TODO: move to currentGameService
          console.log(`Players of ${curClub.nameRu}`, players);
          // sort not really needed since it happened in select
          return gotPlayers({players: sortClubsRoster(players)});
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
            const cupSchedules = this.game.generateCupSchedules(countries, leagues, clubs);
            return scheduleGenerated({schedule: {...leagueSchedules, ...cupSchedules}});
        }));
      })
    ));

  generateTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(scheduleGenerated),
      switchMap(actions => {
        return this.store.pipe(select(getAllLeagues)).pipe(map(leagues => {
          const leagueTables = this.game.generateTables(leagues);
          return tablesGenerated({tables: {...leagueTables}});
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
