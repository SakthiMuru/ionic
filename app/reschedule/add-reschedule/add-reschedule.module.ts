import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReschedulePageRoutingModule } from './add-reschedule-routing.module';

import { AddReschedulePage } from './add-reschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddReschedulePageRoutingModule
  ],
  declarations: [AddReschedulePage]
})
export class AddReschedulePageModule {}
