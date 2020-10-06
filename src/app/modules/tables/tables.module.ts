import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { TablesMainPageComponent } from './tables-main-page/tables-main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {OrganizationChartModule} from 'primeng';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

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
    OrganizationChartModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
  ]
})
export class TablesModule { }
