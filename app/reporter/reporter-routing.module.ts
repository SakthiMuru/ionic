import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporterPage } from './reporter.page';

const routes: Routes = [
  {
    path: '',
    component: ReporterPage
  },
  {
    path: 'add-reporter',
    loadChildren: () => import('./add-reporter/add-reporter.module').then( m => m.AddReporterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporterPageRoutingModule {}
