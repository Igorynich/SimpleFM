import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';
import {CUP_INTERVAL} from '../../../../constants/general';

@Component({
  selector: 'app-cup-table',
  templateUrl: './cup-table.component.html',
  styleUrls: ['./cup-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CupTableComponent implements OnInit {

  @Input() cupSchedule: Match1[][];

  constructor() { }

  ngOnInit(): void {
  }

  cupRoundToWeek(round: number): number {
    return round * CUP_INTERVAL + 1;
  }

}
