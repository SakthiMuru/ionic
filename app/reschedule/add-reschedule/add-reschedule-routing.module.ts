import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReschedulePage } from './add-reschedule.page';

const routes: Routes = [
  {
    path: '',
    component: AddReschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReschedulePageRoutingModule {}
