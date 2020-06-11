import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ScheduleMainPageComponent } from './schedule-main-page/schedule-main-page.component';

const routes = [
  {
    path: '',
    component: ScheduleMainPageComponent
  }
];

@NgModule({
  declarations: [ScheduleMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ScheduleModule { }
