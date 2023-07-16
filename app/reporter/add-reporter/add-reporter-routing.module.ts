import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReporterPage } from './add-reporter.page';

const routes: Routes = [
  {
    path: '',
    component: AddReporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReporterPageRoutingModule {}
