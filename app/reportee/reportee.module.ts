import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../components/input/input.module';
import { IonicModule } from '@ionic/angular';

import { ReporteePageRoutingModule } from './reportee-routing.module';

import { ReporteePage } from './reportee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    ReporteePageRoutingModule
  ],
  declarations: [ReporteePage]
})
export class ReporteePageModule {}
