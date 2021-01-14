import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { FinanceMainPageComponent } from './finance-main-page/finance-main-page.component';

const routes = [
  {
    path: '',
    component: FinanceMainPageComponent
  }
];

@NgModule({
  declarations: [FinanceMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class FinanceModule { }
