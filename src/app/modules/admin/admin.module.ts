import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { EditCountryDialogComponent } from './edit-country-dialog/edit-country-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditLeagueDialogComponent } from './edit-league-dialog/edit-league-dialog.component';
import {NgSelectModule} from '@ng-select/ng-select';

const routes = [
  {
    path: '',
    component: AdminMainPageComponent
  }
];

@NgModule({
  declarations: [
    AdminMainPageComponent,
    EditCountryDialogComponent,
    EditLeagueDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    NgSelectModule
  ],
  entryComponents: [
    EditCountryDialogComponent,
    EditLeagueDialogComponent
  ]
})
export class AdminModule { }
