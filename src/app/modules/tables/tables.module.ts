import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { TablesMainPageComponent } from './tables-main-page/tables-main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { LeagueTableComponent } from './league-table/league-table.component';
import { ScheduleToursListComponent } from './schedule/schedule-tours-list/schedule-tours-list.component';
import { ScheduleTourMatchesListComponent } from './schedule/schedule-tour-matches-list/schedule-tour-matches-list.component';
import { ScheduleMatchItemComponent } from './schedule/schedule-match-item/schedule-match-item.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerListItemComponent } from './players/player-list-item/player-list-item.component';
import { CupTableComponent } from './cup/cup-table/cup-table.component';
import { CupMatchItemComponent } from './cup/cup-match-item/cup-match-item.component';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes = [
  {
    path: '',
    component: TablesMainPageComponent
  }
];

@NgModule({
  declarations: [
    TablesMainPageComponent,
    LeagueTableComponent,
    ScheduleToursListComponent,
    ScheduleTourMatchesListComponent,
    ScheduleMatchItemComponent,
    PlayerListComponent,
    PlayerListItemComponent,
    CupTableComponent,
    CupMatchItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgSelectModule,
    OrganizationChartModule,
    MatTooltipModule,
  ]
})
export class TablesModule { }
