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
import { MatchResultComponent } from './match-result/match-result.component';
import { PlayersListDialogComponent } from './players-list-dialog/players-list-dialog.component';
import {MatListModule} from '@angular/material/list';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppComponent} from '../app.component';
import {IsMyClubPipe} from '../pipes/is-my-club.pipe';
import {Match1ToMatchPipe} from '../pipes/match1-to-match.pipe';
import {KeysPipe} from '../pipes/keys.pipe';
import {MatchOpponentPipe} from '../pipes/match-opponent.pipe';
import {MatchResultClassPipe} from '../pipes/match-result-class.pipe';
import {AdjustedMatchResultPipe} from '../pipes/adjusted-match-result.pipe';
import {LeagueTourToWeekPipe} from '../pipes/league-tour-to-week.pipe';
import {CupRoundToWeekPipe} from '../pipes/cup-round-to-week.pipe';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    InfoDialogComponent,
    NavigateToOfficeComponent,
    MatchTooltipComponent,
    MatchTooltipDirective,
    MatchResultComponent,
    PlayersListDialogComponent,
    FeedbackDialogComponent,
    ReportDialogComponent,
    TooltipsComponent,
    IsMyClubPipe,
    Match1ToMatchPipe,
    KeysPipe,
    MatchOpponentPipe,
    MatchResultClassPipe,
    AdjustedMatchResultPipe,
    LeagueTourToWeekPipe,
    CupRoundToWeekPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    NavigateToOfficeComponent,
    MatchTooltipDirective,
    MatchResultComponent,
    TooltipsComponent,
    IsMyClubPipe,
    Match1ToMatchPipe,
    KeysPipe,
    MatchOpponentPipe,
    MatchResultClassPipe,
    AdjustedMatchResultPipe,
    LeagueTourToWeekPipe,
    CupRoundToWeekPipe
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
