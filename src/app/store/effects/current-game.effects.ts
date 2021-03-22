import {Injectable} from '@angular/core';
import {Actions, createEffect, EffectNotification, ofType, OnRunEffects} from '@ngrx/effects';
import {FirebaseService} from '../../services/firebase.service';
import {
  addFinanceRecord, addTransferRecord, advanceASeason, advanceAWeek, cleanUpBeforeANewSeason,
  expandStadium, generateStuffForANewSeason,
  getBaseData,
  getClub, giveSeasonalPrizeMoney,
  gotBaseData,
  gotClub,
  gotPlayers, loading,
  logOut, makeDivisionRotations, playerTransferToAClub, playerTransferToCurClub, rotateClubs,
  scheduleGenerated,
  tablesGenerated
} from '../actions/current-game.actions';
import {concatMap, exhaustMap, filter, map, mergeMap, switchMap, take, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {CurrentGameState} from '../reducers/current-game.reducer';
import {combineLatest, Observable, of} from 'rxjs';
import {Club} from '../../interfaces/club';
import {
  AppState, getAllAvailableClubs,
  getAllClubs,
  getAllCountries,
  getAllLeagues, getClubsCupResultByClubsNameEn, getCurrentCountryLeagues, selectClubsByLeagueName,
  selectCurrentClub, selectCurrentPlayers, selectLeagueTableByLeaguesNameEn,
  selectPlayersByClubsNameEn
} from '../selectors/current-game.selectors';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {CurrentGameService} from '../../services/current-game.service';
import {sortClubsRoster} from '../../utils/sort-roster';
import {UserService} from '../../services/user.service';
import {TransferService} from '../../services/transfer.service';
import {League} from '../../interfaces/league';
import {LeagueTable} from '../../interfaces/league-table';
import {FinanceService} from '../../services/finance.service';
import {NUM_OF_CLUBS_IN_DIVISION_ROTATION} from '../../constants/general';
import {CupResult} from '../../interfaces/cup-result';
import {Player} from '../../interfaces/player';
import {randomInteger} from '../../utils/helpers';
import {StorageService} from '../../services/storage.service';

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
          this.storage.saveDBData({countries, leagues, clubs, players, scheduleShells});
          return gotBaseData({countries, leagues, clubs, players, scheduleShells});
        }));
      })
    );
  });

  getClub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gotBaseData),
      filter(value => !!this.userService.userName),
      switchMap(action => this.store.pipe(select(getAllAvailableClubs)).pipe(take(1), map(clubs => {
        const randomNum = randomInteger(0, clubs.length - 1);
        console.log('Got Club', randomNum, clubs.length);
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
            console.warn('GotPlayers generating schedules NOW');
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
          take(1),
          // filter(value => !!this.userService.userName),
          switchMap(leagues => {
            const leagueTables = this.game.generateTables(leagues);
            // generating first transfer list
            console.log('generating first tr list in effects');
            this.transferService.generateTransferList();
            //
            return [
              tablesGenerated({tables: {...leagueTables}}),
              loading({status: false})
            ];
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
            }),
            addTransferRecord({
              transfer: {
                fee: player.price,
                playerNameEn: player.nameEn,
                week: null,
                season: null,
                from: player.clubNameEn,
                to: curClub.nameEn
              }})
          ]),
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
        return [
          addFinanceRecord({
            clubNameEn: player.clubNameEn,
            description: `Продажа ${player.nameRu}`,
            expense: null,
            income: player.price * 1000000
          }),
          addFinanceRecord({
            clubNameEn: clubsNameEn,
            description: `Покупка ${player.nameRu}`,
            expense: player.price * 1000000,
            income: null
          }),
          addTransferRecord({
            transfer: {
              fee: player.price,
              playerNameEn: player.nameEn,
              week: null,
              season: null,
              from: player.clubNameEn,
              to: clubsNameEn
            }})
        ];
      })
    ));

  seasonalPrizeMoney$ = createEffect(() =>
    this.actions$.pipe(
      ofType(giveSeasonalPrizeMoney),
      filter(value => !!this.userService.userName),
      switchMap(() => {
        return combineLatest([
          this.store.select(selectCurrentClub),
          this.store.select(getCurrentCountryLeagues)
        ]).pipe(take(1));
      }),
      switchMap(([club, leagues]) => {
        // console.warn('LEAGUES?', leagues);
        const leagueClubsSelects$: Observable<Club[]>[] =
          leagues.map(l => this.store.select(selectClubsByLeagueName, {leaguesNameEn: l.nameEn}));
        return combineLatest(leagueClubsSelects$).pipe(take(1), map((clubsArr: Club[][]) => {
          // console.log('CLUBS', clubsArr, leagues);
          return [clubsArr, leagues];
        }));
      }),
      switchMap(([clubArrays, leagues]: [Club[][], League[]]) => {
        console.warn('BIG clubArrays', clubArrays, leagues);
        const clubs: Club[] = [];
        clubArrays.forEach((clubArr: Club[]) => clubs.push(...clubArr));
        const cupResultSelects$: Observable<{ clubNameEn: string, eliminated: number | null, total: number }>[] = clubs.map(cl =>
          this.store.select(getClubsCupResultByClubsNameEn, {clubsNameEn: cl.nameEn}));
        const tableSelects$: Observable<LeagueTable[]>[] = leagues.map((l: League) =>
          this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: l.nameEn}));
        return combineLatest([
          combineLatest(cupResultSelects$),
          combineLatest(tableSelects$)
        ]).pipe(take(1), map(value => {
          // console.warn('Big', value, leagues, clubArrays);
          return [...value, leagues, clubArrays];
        }));
      }),
      switchMap(([cupResults, tableArrays, leagues, clubArrays]:
                   [CupResult[], LeagueTable[][], League[], Club[][]]) => {
        // console.warn('BIG cupResults', cupResults, tableArrays, leagues, clubArrays);
        const financeRecords = [];
        leagues.forEach((league, index) => {
          clubArrays[index].forEach((club: Club) => {
            const leaguePosIndex = tableArrays[index].findIndex((tableRec: LeagueTable) => tableRec.clubName === club.nameEn
              || tableRec.clubName === club.nameRu);
            financeRecords.push(addFinanceRecord({
              clubNameEn: club.nameEn,
              description: `Призовые за ${leaguePosIndex + 1} место в ${league.nameRu}`,
              expense: null,
              income: this.finService.calculateClubsLeaguePrizeMoney(league.tier, leaguePosIndex + 1, tableArrays[index].length) * 1000000
            }));
            const clubsCupResult: CupResult =
              cupResults.find(results => results.clubNameEn === club.nameEn);
            const desc = clubsCupResult.eliminated ? `Призовые за ${clubsCupResult.eliminated} раунд кубка` : `Призовые за победу в кубке`;
            financeRecords.push(addFinanceRecord({
              clubNameEn: club.nameEn,
              description: desc,
              expense: null,
              income: this.finService.calculateClubsCupPrizeMoney(clubsCupResult.eliminated, clubsCupResult.total) * 1000000
            }));
          });
        });
        return financeRecords;
      })
    ));

  divisionRotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makeDivisionRotations),
      filter(value => !!this.userService.userName),
      switchMap(() => {
        return this.store.select(getCurrentCountryLeagues).pipe(take(1));
      }),
      switchMap((leagues: League[]) => {
        const tableSelects$: Observable<LeagueTable[]>[] = leagues.map((l: League) =>
          this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: l.nameEn}));
        return combineLatest(tableSelects$).pipe(take(1), map((tables: LeagueTable[][]) => [tables, leagues]));
      }),
      switchMap(([tables, leagues]: [LeagueTable[][], League[]]) => {
        const rotationActions = [];
        leagues.forEach((l: League, index) => {
          const table: LeagueTable[] = tables[index];
          if (table.length) {
            const topClubNames: string[] = table.filter((value: LeagueTable, place) => place < NUM_OF_CLUBS_IN_DIVISION_ROTATION)
              .map((value: LeagueTable) => value.clubName);
            const bottomClubNames: string[] = table.filter((value: LeagueTable, place) =>
              place >= (table.length - NUM_OF_CLUBS_IN_DIVISION_ROTATION)).map((value: LeagueTable) => value.clubName);
            rotationActions.push(rotateClubs({clubNames: topClubNames, direction: 'up'}));
            rotationActions.push(rotateClubs({clubNames: bottomClubNames, direction: 'down'}));
          }
        });
        return rotationActions;
      })
    ));

  generateStuffForANewSeason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateStuffForANewSeason),
      filter(value => !!this.userService.userName),
      switchMap(actions => {
        return this.store.select(selectCurrentPlayers).pipe(take(1));
      }),
      map((curPlayers: Player[]) => {
        return gotPlayers({players: curPlayers});
      })
    ));

  constructor(private actions$: Actions,
              private fs: FirebaseService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private game: CurrentGameService,
              private userService: UserService,
              private transferService: TransferService,
              private finService: FinanceService,
              private storage: StorageService) {
  }

}
