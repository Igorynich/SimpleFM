import { Component, OnInit } from '@angular/core';
import {Player} from '../../../interfaces/player';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentPlayers} from '../../../store/selectors/current-game.selectors';
import {TransferService} from '../../../services/transfer.service';
import {map, take} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {CurrencyPipe} from '@angular/common';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-sell-player-dialog',
  templateUrl: './sell-player-dialog.component.html',
  styleUrls: ['./sell-player-dialog.component.css']
})
export class SellPlayerDialogComponent implements OnInit {

  curPlayers$: Observable<Player[]>;

  constructor(private store: Store<AppState>,
              private transferService: TransferService,
              private dialog: MatDialog,
              private currencyPipe: CurrencyPipe,
              private dialogRef: MatDialogRef<SellPlayerDialogComponent>,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.curPlayers$ = this.store.select(selectCurrentPlayers).pipe(map(players =>
      this.transferService.generateListWithPrices(players)));
  }

  sellPlayerClick(player: Player) {
    // TODO different dialog component for transfer confirmation with black jack and whores
    const dial = this.dialog.open(ConfirmationDialogComponent, {
      data: {header: `Продать ${player.nameRu}(${player.position}-${player.power}) за ${this.currencyPipe.transform(player.price)}M?`}
    });
    dial.afterClosed().pipe(take(1)).subscribe(value => {
      if (value) {
        this.dialogRef.close(player);
      }
    });
  }

  playerNotEligibleByPosition(player: Player): boolean {
    return !this.transferService.isClubHaveEnoughPlayersOfThatPosition(player);
  }

  playerNotEligibleByWeeklyLimit(player: Player): boolean {
    return this.transferService.playerWasAlreadySoldThisWeek();
  }

  getSellButtonTooltip(player: Player): string {
    if (this.playerNotEligibleByWeeklyLimit(player)) {
      return 'Больше нельзя продавать игроков на этой неделе';
    } else if (this.playerNotEligibleByPosition(player)) {
      return 'Мало игроков этой позиции';
    }
    return '';
  }
}
