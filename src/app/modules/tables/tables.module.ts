import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { TablesMainPageComponent } from './tables-main-page/tables-main-page.component';
import {SharedModule} from '../../shared/shared.module';

const routes = [
  {
    path: '',
    component: TablesMainPageComponent
  }
];

@NgModule({
  declarations: [TablesMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class TablesModule { }
