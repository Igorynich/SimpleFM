import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';
import {AppState, selectCurrentClub, selectCurrentWeek} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {Club} from '../../../interfaces/club';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.css']
})
export class ResultsCardComponent implements OnInit {

  @Input() currentWeek: number;

  @Input() curWeekResults: CurrentWeekSchedule[] = [];

  @Output() continue = new EventEmitter();

  curClub$: Observable<Club>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
  }

  onContinueClick() {
    this.continue.emit();
  }

  private keys(obj): string[] {
    return Object.keys(obj);
  }
}
