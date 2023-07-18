import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditApprovalPageRoutingModule } from './edit-approval-routing.module';
import { EditApprovalPage } from './edit-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditApprovalPageRoutingModule
  ],
  declarations: [EditApprovalPage]
})
export class EditApprovalPageModule {}
