import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../components/input/input.module';
import { IonicModule } from '@ionic/angular';

import { ApprovalPageRoutingModule } from './approval-routing.module';

import { ApprovalPage } from './approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    ApprovalPageRoutingModule
  ],
  declarations: [ApprovalPage]
})
export class ApprovalPageModule {}
