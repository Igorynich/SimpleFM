import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatTabsModule} from '@angular/material';
import { EditCountryDialogComponent } from './edit-country-dialog/edit-country-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path: '',
    component: AdminMainPageComponent
  }
];

@NgModule({
  declarations: [
    AdminMainPageComponent,
    EditCountryDialogComponent
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
    MatDialogModule
  ],
  entryComponents: [
    EditCountryDialogComponent
  ]
})
export class AdminModule { }
