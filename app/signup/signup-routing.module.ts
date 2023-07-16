import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule,],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
