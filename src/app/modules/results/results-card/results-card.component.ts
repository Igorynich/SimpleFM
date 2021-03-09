import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';
import {AppState} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {DOCUMENT, isPlatformBrowser, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.css']
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
