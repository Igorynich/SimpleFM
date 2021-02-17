import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonEndMainPageComponent } from './season-end-main-page/season-end-main-page.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


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
    SharedModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class SeasonEndModule { }
