import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsMainPageComponent } from './results-main-page/results-main-page.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ResultsCardComponent } from './results-card/results-card.component';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';

const routes = [
  {
    path: '',
    component: ResultsMainPageComponent
  }
];

@NgModule({
  declarations: [ResultsMainPageComponent, ResultsCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedModule
  ]
})
export class ResultsModule { }
