import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StadiumMainPageComponent } from './stadium-main-page/stadium-main-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';

const routes = [
  {
    path: '',
    component: StadiumMainPageComponent
  }
];

@NgModule({
  declarations: [StadiumMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule
  ]
})
export class StadiumModule { }
