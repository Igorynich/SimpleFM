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
