import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ScheduleMainPageComponent } from './schedule-main-page/schedule-main-page.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../../shared/shared.module';
import { ScheduleListItemComponent } from './schedule-list-item/schedule-list-item.component';

const routes = [
  {
    path: '',
    component: ScheduleMainPageComponent
  }
];

@NgModule({
  declarations: [ScheduleMainPageComponent, ScheduleListItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    SharedModule,
  ]
})
export class ScheduleModule { }
