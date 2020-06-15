import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from '../../constants/routes';

const officeRoutes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: ROUTES.ADMIN,
        loadChildren: () => import('../admin/admin.module').then(mod => mod.AdminModule)
      },
      {
        path: ROUTES.ROSTER,
        loadChildren: () => import('../roster/roster.module').then(mod => mod.RosterModule)
      },
      {
        path: ROUTES.SCHEDULE,
        loadChildren: () => import('../schedule/schedule.module').then(mod => mod.ScheduleModule)
      },
      {
        path: ROUTES.TABLES,
        loadChildren: () => import('../tables/tables.module').then(mod => mod.TablesModule)
      },
    ]
  },
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
