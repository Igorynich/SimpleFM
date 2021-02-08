import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {UserGuard} from './guards/user.guard';
import {ROUTES} from './constants/routes';


const routes = [
  {
    path: ROUTES.OFFICE,
    loadChildren: () => import('./modules/office/office.module').then(mod => mod.OfficeModule),
    canLoad: [UserGuard],
    data: { preload: true }
    // canActivate: [UserGuard]
  },
  {
    path: ROUTES.RESULTS,
    loadChildren: () => import('./modules/results/results.module').then(mod => mod.ResultsModule),
    canLoad: [UserGuard],
    // data: { preload: true }
    // canActivate: [UserGuard]
  },
  {
    path: ROUTES.NEW_JOB,
    loadChildren: () => import('./modules/new-job/new-job.module').then(mod => mod.NewJobModule),
    canLoad: [UserGuard],
    // data: { preload: true }
    // canActivate: [UserGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: '**',
    component: AppComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
