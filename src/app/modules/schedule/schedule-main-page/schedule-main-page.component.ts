import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectCurrentClub, selectCurrentSeason,
  selectScheduleByClubsNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Match} from '../../../interfaces/match';


@Component({
  selector: 'app-schedule-main-page',
  templateUrl: './schedule-main-page.component.html',
  styleUrls: ['./schedule-main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleMainPageComponent implements OnInit {

  curClubsSchedule$: Observable<Match[]>;
  curSeason$: Observable<number>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.curSeason$ = this.store.select(selectCurrentSeason);
    this.curClubsSchedule$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectScheduleByClubsNameEn, {clubsNameEn: curClub.nameEn})), map(schedule => {
      return schedule;
    }));
  }
}
