import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EditCountryDialogComponent } from './edit-country-dialog/edit-country-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditLeagueDialogComponent } from './edit-league-dialog/edit-league-dialog.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { AddCountryDialogComponent } from './add-country-dialog/add-country-dialog.component';

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
    EditLeagueDialogComponent,
    AddCountryDialogComponent
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
    NgSelectModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    EditCountryDialogComponent,
    EditLeagueDialogComponent,
    AddCountryDialogComponent
  ]
})
export class AdminModule { }
