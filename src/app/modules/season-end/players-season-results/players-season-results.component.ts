import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {map, switchMap, take} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {
    AppState, getClubsCupResultByClubsNameEn,
    getLeagueByLeagueNameEn, selectCurrentClub,
    selectFinanceRecordsByClubsNameEn,
    selectLeagueTableByLeaguesNameEn
} from '../../../store/selectors/current-game.selectors';
import {Observable} from 'rxjs';
import {League} from '../../../interfaces/league';
import {Store} from '@ngrx/store';
import {ConfigService} from '../../../services/config.service';
import {LeagueTable} from '../../../interfaces/league-table';
import {FinanceRecord} from '../../../interfaces/finance-record';
import {CupResult} from '../../../interfaces/cup-result';
import {last} from 'lodash';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-players-season-results',
    templateUrl: './players-season-results.component.html',
    styleUrls: ['./players-season-results.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersSeasonResultsComponent implements OnInit {

    curClub$: Observable<Club>;
    displayedColumns1: string[] = ['position', 'clubName', 'games', 'wins', 'draws', 'loses', 'gf', 'ga', 'gd', 'points'];
    playersCupPrizeMoney$: Observable<number>;
    playersLeaguePrizeMoney$: Observable<number>;
    playersCupResult$: Observable<CupResult>;
    playersLeague$: Observable<League>;
    playersLeagueTable$: Observable<LeagueTable[]>;

    constructor(private store: Store<AppState>,
                public config: ConfigService,
                public userService: UserService) {
    }

    ngOnInit(): void {
        this.curClub$ = this.store.select(selectCurrentClub).pipe(take(1));
        this.playersLeague$ = this.curClub$.pipe(switchMap((curClub: Club) =>
            this.store.select(getLeagueByLeagueNameEn, {leaguesNameEn: curClub.leagueNameEn}).pipe(take(1))));
        this.playersLeagueTable$ = this.curClub$.pipe(switchMap((curClub: Club) =>
            this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn}).pipe(take(1))));

        this.playersCupPrizeMoney$ = this.curClub$.pipe(switchMap((curClub: Club) =>
                this.store.select(selectFinanceRecordsByClubsNameEn, {clubsNameEn: curClub.nameEn}).pipe(take(1))),
            map((financeRecords: { [week: number]: FinanceRecord[] }) => {
                const lastWeek = last(Object.keys(financeRecords));
                const lastWeeksRecords: FinanceRecord[] = financeRecords[lastWeek];
                // TODO make better
                const cupPrizeRecord: FinanceRecord = lastWeeksRecords.find(value => value.description.includes('кубк') ||
                    value.description.includes('the Cup'));   // lul
                return cupPrizeRecord?.income || 0;
            }));
        this.playersLeaguePrizeMoney$ = this.curClub$.pipe(switchMap((curClub: Club) =>
                this.store.select(selectFinanceRecordsByClubsNameEn, {clubsNameEn: curClub.nameEn})
                    .pipe(take(1), map(value => [value, curClub]))),
            map(([financeRecords, curClub]: [{ [week: number]: FinanceRecord[] }, Club]) => {
                const lastWeek = last(Object.keys(financeRecords));
                const lastWeeksRecords: FinanceRecord[] = financeRecords[lastWeek];
                const cupPrizeRecord: FinanceRecord = lastWeeksRecords.find(value =>
                    value.description.includes(curClub.leagueNameRu) || value.description.includes(curClub.leagueNameEn));   // lul
                return cupPrizeRecord.income;
            }));
        this.playersCupResult$ = this.curClub$.pipe(switchMap((curClub: Club) =>
            this.store.select(getClubsCupResultByClubsNameEn, {clubsNameEn: curClub.nameEn}).pipe(take(1))));
    }

    isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
        return element.club.nameEn === curClub.nameEn;
    }

}
