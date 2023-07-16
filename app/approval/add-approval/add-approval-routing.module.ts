import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddApprovalPage } from './add-approval.page';

const routes: Routes = [
  {
    path: '',
    component: AddApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddApprovalPageRoutingModule {}
