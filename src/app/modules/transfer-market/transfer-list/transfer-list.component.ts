import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../../interfaces/player';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferListComponent implements OnInit {

  @Input() listedPlayers: Player[];

  @Output() buy = new EventEmitter<Player>();
  @Output() remove = new EventEmitter<Player>();

  constructor() { }

  ngOnInit(): void {
  }

  buyPlayerClick(player: Player) {
    this.buy.emit(player);
  }

  removePlayerFromList(player: Player) {
    this.remove.emit(player);
  }
}
