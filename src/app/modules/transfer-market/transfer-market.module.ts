import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { TransferMarketMainPageComponent } from './transfer-market-main-page/transfer-market-main-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SellPlayerDialogComponent } from './sell-player-dialog/sell-player-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TransferMarketPlayerItemComponent } from './transfer-market-player-item/transfer-market-player-item.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';


const routes = [
  {
    path: '',
    component: TransferMarketMainPageComponent
  }
];

@NgModule({
  declarations: [TransferMarketMainPageComponent, SellPlayerDialogComponent, TransferMarketPlayerItemComponent, TransferListComponent, TransferHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    ScrollingModule,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class TransferMarketModule { }
