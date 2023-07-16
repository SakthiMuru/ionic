import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddApprovalPageRoutingModule } from './add-approval-routing.module';

import { AddApprovalPage } from './add-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddApprovalPageRoutingModule
  ],
  declarations: [AddApprovalPage]
})
export class AddApprovalPageModule {}
