import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReporteePageRoutingModule } from './add-reportee-routing.module';

import { AddReporteePage } from './add-reportee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddReporteePageRoutingModule
  ],
  declarations: [AddReporteePage]
})
export class AddReporteePageModule {}
