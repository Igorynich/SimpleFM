import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import {MatTableModule, MatTabsModule} from '@angular/material';

const routes = [
  {
    path: '',
    component: AdminMainPageComponent
  }
];

@NgModule({
  declarations: [AdminMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatTableModule,
  ]
})
export class AdminModule { }
