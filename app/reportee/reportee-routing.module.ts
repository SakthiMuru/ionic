import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteePage } from './reportee.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteePage
  },
  {
    path: 'add-reportee',
    loadChildren: () => import('./add-reportee/add-reportee.module').then( m => m.AddReporteePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteePageRoutingModule {}
