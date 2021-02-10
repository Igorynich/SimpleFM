import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonEndMainPageComponent } from './season-end-main-page/season-end-main-page.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';


const routes = [
  {
    path: '',
    component: SeasonEndMainPageComponent
  }
];

@NgModule({
  declarations: [SeasonEndMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    SharedModule
  ]
})
export class SeasonEndModule { }
