import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';
import {AppState} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.css']
})
export class ResultsCardComponent implements OnInit {

  @Input() currentWeek: number;

  @Input() curWeekResults: CurrentWeekSchedule[] = [];

  @Output() continue = new EventEmitter();

  // curClub$: Observable<Club>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.curClub$ = this.store.select(selectCurrentClub);
  }

  onContinueClick() {
    this.continue.emit();
  }
}
