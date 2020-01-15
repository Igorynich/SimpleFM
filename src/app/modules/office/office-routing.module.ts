import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';

const officeRoutes = [
  {
    path: '',
    component: MainPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(officeRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class OfficeRoutingModule { }
