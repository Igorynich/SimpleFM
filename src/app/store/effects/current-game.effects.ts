import {Injectable} from '@angular/core';
import {Actions, createEffect, EffectNotification, ofType, OnRunEffects} from '@ngrx/effects';
import {FirebaseService} from '../../services/firebase.service';
import {
  addFinanceRecord,
  expandStadium,
  getBaseData,
  getClub,
  gotBaseData,
  gotClub,
  gotPlayers,
  logOut, playerTransferToAClub, playerTransferToCurClub,
  scheduleGenerated,
  tablesGenerated
} from '../actions/current-game.actions';
import {concatMap, exhaustMap, filter, map, mergeMap, switchMap, take, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {CurrentGameState} from '../reducers/current-game.reducer';
import {combineLatest, Observable, of} from 'rxjs';
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
import {UserService} from '../../services/user.service';
import {TransferService} from '../../services/transfer.service';

@Injectable()
export class CurrentGameEffects {

  getBaseData$ = createEffect(() => {
    console.log('1st effect');
    return this.actions$.pipe(
      ofType(getBaseData),
      filter(value => !!this.userService.userName),
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
      filter(value => !!this.userService.userName),
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
      filter(value => !!this.userService.userName),
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
      filter(value => !!this.userService.userName),
      switchMap(actions => {
        return combineLatest([
          this.store.pipe(select(getAllCountries), take(1)),
          this.store.pipe(select(getAllLeagues), take(1)),
          this.store.pipe(select(getAllClubs), take(1))]).pipe(
          filter(value => !!this.userService.userName),
          map(([countries, leagues, clubs]) => {
            const leagueSchedules = this.game.generateLeagueSchedules(leagues, clubs);
            const cupSchedules = this.game.generateCupSchedules(countries, leagues, clubs);
            return scheduleGenerated({schedule: {...leagueSchedules, ...cupSchedules}});
          }));
      })
    ));

  generateTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(scheduleGenerated),
      filter(value => !!this.userService.userName),
      switchMap(actions => {
        return this.store.pipe(select(getAllLeagues)).pipe(
          filter(value => !!this.userService.userName),
          map(leagues => {
            const leagueTables = this.game.generateTables(leagues);
            return tablesGenerated({tables: {...leagueTables}});
          }));
      })
    ));


  stadiumExpansionFinanceReportGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(expandStadium),
      filter(value => !!this.userService.userName),
      mergeMap(({step, cost}) => {
        console.warn('stadiumExpansionFinanceReportGeneration$', step, cost);
        return this.store.pipe(select(selectCurrentClub)).pipe(
          take(1),
          map(curClub => {
            return addFinanceRecord({
              clubNameEn: curClub.nameEn,
              description: `Увеличение вместительности стадиона на ${step}`,
              expense: cost * 1000000,
              income: null
            });
          }));
      })
    ));
  // transfer to current club
  playerTransferToCurClubFinanceReportGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerTransferToCurClub),
      filter(value => !!this.userService.userName),
      mergeMap(({player}) => {
        console.warn('playerTransferFinanceReportGeneration$', player);
        return this.store.pipe(select(selectCurrentClub)).pipe(
          take(1),
          switchMap(curClub => [
            addFinanceRecord({
              clubNameEn: curClub.nameEn,
              description: `Покупка ${player.nameRu}`,
              expense: player.price * 1000000,
              income: null
            }),
            addFinanceRecord({
              clubNameEn: player.clubNameEn,
              description: `Продажа ${player.nameRu}`,
              expense: null,
              income: player.price * 1000000
            })]),
        );
      })
    ));

  // transfer to any club
  playerTransferToAClubFinanceReportGeneration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerTransferToAClub),
      filter(value => !!this.userService.userName),
      mergeMap(({player, clubsNameEn}) => {
        console.warn('playerTransferToAClubFinanceReportGeneration$', player, clubsNameEn);
        return this.store.pipe(select(selectCurrentClub)).pipe(
          take(1),
          switchMap(curClub => {
            // if selling current player - to block more sales this week
            if (player.clubNameEn === curClub.nameEn) {
              this.transferService.currentPlayerSold();
            }
            return [
              addFinanceRecord({
                clubNameEn: curClub.nameEn,
                description: `Продажа ${player.nameRu}`,
                expense: null,
                income: player.price * 1000000
              }),
              addFinanceRecord({
                clubNameEn: clubsNameEn,
                description: `Покупка ${player.nameRu}`,
                expense: player.price * 1000000,
                income: null
              })];
          }),
        );
      })
    ));

  constructor(private actions$: Actions,
              private fs: FirebaseService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private game: CurrentGameService,
              private userService: UserService,
              private transferService: TransferService) {
  }

}
