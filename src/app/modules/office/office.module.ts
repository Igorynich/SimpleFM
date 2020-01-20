import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import {OfficeRoutingModule} from './office-routing.module';
import {MatButtonModule, MatCardModule} from '@angular/material';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class OfficeModule { }
