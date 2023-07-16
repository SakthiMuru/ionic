import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddReporterPageRoutingModule } from './add-reporter-routing.module';

import { AddReporterPage } from './add-reporter.page';
import { InputModule } from 'src/app/components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InputModule,
    AddReporterPageRoutingModule
  ],
  declarations: [AddReporterPage]
})
export class AddReporterPageModule {}
