import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { NavigateToOfficeComponent } from './navigate-to-office/navigate-to-office.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatchTooltipComponent } from './match-tooltip/match-tooltip.component';
import {MatchTooltipDirective} from '../directives/match-tooltip.directive';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    InfoDialogComponent,
    NavigateToOfficeComponent,
    MatchTooltipComponent,
    MatchTooltipDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    NavigateToOfficeComponent,
    MatchTooltipDirective
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
