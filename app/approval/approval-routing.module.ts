import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalPage } from './approval.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalPage
  },
  {
    path: 'add-approval',
    loadChildren: () => import('./add-approval/add-approval.module').then( m => m.AddApprovalPageModule)
  },
  {
    path: 'edit-approval',
    loadChildren: () => import('./edit-approval/edit-approval.module').then( m => m.EditApprovalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalPageRoutingModule {}
