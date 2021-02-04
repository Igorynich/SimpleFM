import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransferService} from '../../../services/transfer.service';
import {Player} from '../../../interfaces/player';
import {Observable, Subscription} from 'rxjs';
import {Club} from '../../../interfaces/club';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub, selectTransferListedPlayers} from '../../../store/selectors/current-game.selectors';
import {playerTransferToAClub, playerTransferToCurClub} from '../../../store/actions/current-game.actions';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {CurrencyPipe} from '@angular/common';
import {CleanSubscriptions, clearSubscription} from '../../../utils/clean-subscriptions';
import {take} from 'rxjs/operators';
import {SellPlayerDialogComponent} from '../sell-player-dialog/sell-player-dialog.component';
import {SnackBarService} from '../../../services/snack-bar.service';

@CleanSubscriptions()
@Component({
  selector: 'app-transfer-market-main-page',
  templateUrl: './transfer-market-main-page.component.html',
  styleUrls: ['./transfer-market-main-page.component.css']
})
export class TransferMarketMainPageComponent implements OnInit, OnDestroy {

  curClub$: Observable<Club>;
  listedPlayers$: Observable<Player[]>;

  private _dialogSub: Subscription;

  constructor(private transferService: TransferService,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private currencyPipe: CurrencyPipe,
              private snack: SnackBarService) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
    this.listedPlayers$ = this.store.select(selectTransferListedPlayers);
  }

  ngOnDestroy(): void {
  }

  buyPlayerClick(player: Player) {
    // TODO different dialog component for transfer confirmation with black jack and whores
    const dial = this.dialog.open(ConfirmationDialogComponent, {
      data: {header: `Купить ${player.nameRu}(${player.position}-${player.power}) за ${this.currencyPipe.transform(player.price)}M?`}
    });
    clearSubscription(this._dialogSub);
    this._dialogSub = dial.afterClosed().pipe(take(1)).subscribe(value => {
      if (value) {
        this.store.dispatch(playerTransferToCurClub({player}));
      }
    });
  }

  removePlayerFromList(player: Player) {

  }

  sellPlayerClick() {
    const dial = this.dialog.open(SellPlayerDialogComponent);
    dial.afterClosed().pipe(take(1)).subscribe((value: Player | null) => {
      if (value) {
        const newClubForAPlayer = this.transferService.findABuyerForAPlayer(value);
        this.store.dispatch(playerTransferToAClub({player: value, clubsNameEn: newClubForAPlayer.nameEn}));
        this.snack.createSnackBar(`${value.nameRu} был продан в ${newClubForAPlayer.nameRu} за ${value.price}M`);
      }
    });
  }
}
