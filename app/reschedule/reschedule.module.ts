import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReschedulePageRoutingModule } from './reschedule-routing.module';

import { ReschedulePage } from './reschedule.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    ReschedulePageRoutingModule
  ],
  declarations: [ReschedulePage]
})
export class ReschedulePageModule {}
