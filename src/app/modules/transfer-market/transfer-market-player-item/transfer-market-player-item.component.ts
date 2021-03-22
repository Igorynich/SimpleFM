import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../interfaces/player';
import {Observable} from 'rxjs';
import {Club} from '../../../interfaces/club';
import {AppState, selectCurrentClub} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-transfer-market-player-item',
  templateUrl: './transfer-market-player-item.component.html',
  styleUrls: ['./transfer-market-player-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferMarketPlayerItemComponent implements OnInit {

  curClub$: Observable<Club>;

  @Input() player: Player;

  @Output() remove = new EventEmitter();
  @Output() buy = new EventEmitter();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
  }

  removePlayer() {
    this.remove.emit();
  }

  buyPlayer() {
    this.buy.emit();
  }

}
