import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditApprovalPage } from './edit-approval.page';

const routes: Routes = [
  {
    path: '',
    component: EditApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditApprovalPageRoutingModule {}
