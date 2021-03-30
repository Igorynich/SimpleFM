import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterMainPageComponent } from './roster-main-page/roster-main-page.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes = [
  {
    path: '',
    component: RosterMainPageComponent
  }
];

@NgModule({
  declarations: [RosterMainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    SharedModule,
    DragDropModule,
    MatTooltipModule,
  ]
})
export class RosterModule { }
