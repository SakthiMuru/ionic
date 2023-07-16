import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReporteePage } from './add-reportee.page';

const routes: Routes = [
  {
    path: '',
    component: AddReporteePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReporteePageRoutingModule {}
