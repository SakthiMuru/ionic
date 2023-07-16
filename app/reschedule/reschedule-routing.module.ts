import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReschedulePage } from './reschedule.page';

const routes: Routes = [
  {
    path: '',
    component: ReschedulePage
  },
  {
    path: 'add-reschedule',
    loadChildren: () => import('./add-reschedule/add-reschedule.module').then( m => m.AddReschedulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReschedulePageRoutingModule {}
