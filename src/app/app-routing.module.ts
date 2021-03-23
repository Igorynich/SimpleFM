import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {UserGuard} from './guards/user.guard';
import {ROUTES} from './constants/routes';
import {ImperativeGuard} from './guards/imperative.guard';


const routes = [
  {
    path: ROUTES.OFFICE,
    loadChildren: () => import('./modules/office/office.module').then(mod => mod.OfficeModule),
    canLoad: [UserGuard],
    data: { preload: true },
    canActivate: [ImperativeGuard]
  },
  {
    path: ROUTES.RESULTS,
    loadChildren: () => import('./modules/results/results.module').then(mod => mod.ResultsModule),
    canLoad: [UserGuard],
    // data: { preload: true }
    canActivate: [ImperativeGuard]
  },
  {
    path: ROUTES.NEW_JOB,
    loadChildren: () => import('./modules/new-job/new-job.module').then(mod => mod.NewJobModule),
    canLoad: [UserGuard],
    // data: { preload: true }
    canActivate: [ImperativeGuard]
  },
  {
    path: ROUTES.SEASON_END,
    loadChildren: () => import('./modules/season-end/season-end.module').then(mod => mod.SeasonEndModule),
    canLoad: [UserGuard],
    // data: { preload: true }
    canActivate: [ImperativeGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    canActivate: [ImperativeGuard],
  },
  {
    path: '**',
    component: AppComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
