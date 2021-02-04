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


const routes = [
  {
    path: '',
    component: TransferMarketMainPageComponent
  }
];

@NgModule({
  declarations: [TransferMarketMainPageComponent, SellPlayerDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class TransferMarketModule { }
