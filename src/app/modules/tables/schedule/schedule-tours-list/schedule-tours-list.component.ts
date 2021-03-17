import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';

@Component({
  selector: 'app-schedule-tours-list',
  templateUrl: './schedule-tours-list.component.html',
  styleUrls: ['./schedule-tours-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleToursListComponent implements OnInit {

  @Input() schedule: Match1[][];
  @Input() selectedWeek = 0;
  @Output() weekSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  tourClick(tour: number) {
    this.weekSelected.emit(tour);
  }
}
