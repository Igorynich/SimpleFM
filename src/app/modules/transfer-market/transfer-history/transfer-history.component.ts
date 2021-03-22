import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Club} from '../../../interfaces/club';
import {AppState, selectCurrentClub} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Transfer1} from '../../../interfaces/transfer1';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferHistoryComponent implements OnInit {

  curClub$: Observable<Club>;

  @Input() transferHistory: Transfer1[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
  }

}
