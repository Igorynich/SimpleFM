import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';
import {AppState} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsCardComponent implements OnInit {

  @Input() currentWeek: number;

  @Input() leagueResults: CurrentWeekSchedule;

  @Output() continue = new EventEmitter();

  @ViewChild('scrollAnchor') scrollAnchor: ElementRef;

  // curClub$: Observable<Club>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.curClub$ = this.store.select(selectCurrentClub);
  }

  onContinueClick() {
    this.continue.emit();
    this.scrollToTop();
  }

  scrollToTop() {
    this.scrollAnchor.nativeElement.scrollIntoView({block: 'nearest', behavior: 'smooth'});
  }
}
