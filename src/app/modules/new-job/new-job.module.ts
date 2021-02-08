import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NewJobMainPageComponent } from './new-job-main-page/new-job-main-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


const routes = [
  {
    path: '',
    component: NewJobMainPageComponent
  }
];

@NgModule({
  declarations: [NewJobMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
  ]
})
export class NewJobModule { }
