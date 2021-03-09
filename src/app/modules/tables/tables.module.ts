import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { TablesMainPageComponent } from './tables-main-page/tables-main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {OrganizationChartModule} from 'primeng';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

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
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class TablesModule { }
