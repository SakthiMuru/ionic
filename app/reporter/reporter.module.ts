import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporterPageRoutingModule } from './reporter-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporterPage } from './reporter.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    ReactiveFormsModule,
    ReporterPageRoutingModule
  ],
  declarations: [ReporterPage]
})
export class ReporterPageModule {}
