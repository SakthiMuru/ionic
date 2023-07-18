import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reporter',
    loadChildren: () => import('./reporter/reporter.module').then( m => m.ReporterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  // {
  //   path: 'reporter',
  //   loadChildren: () => import('./reporter/reporter.module').then( m => m.ReporterPageModule)
  // },
  {
    path: 'add-reporter',
    loadChildren: () => import('./reporter/add-reporter/add-reporter.module').then( m => m.AddReporterPageModule)
  },
  {
    path: 'add-reporter/:id/:view',
    loadChildren: () => import('./reporter/add-reporter/add-reporter.module').then( m => m.AddReporterPageModule)
  },
  {
    path: 'reportee',
    loadChildren: () => import('./reportee/reportee.module').then( m => m.ReporteePageModule)
  },
  {
    path: 'add-reportee',
    loadChildren: () => import('./reportee/add-reportee/add-reportee-routing.module').then( m => m.AddReporteePageRoutingModule)
  },
  {
    path: 'add-reportee/:id/:view',
    loadChildren: () => import('./reportee/add-reportee/add-reportee-routing.module').then( m => m.AddReporteePageRoutingModule)
  },
  {
    path: 'add-reportee/:id/:view1',
    loadChildren: () => import('./reportee/add-reportee/add-reportee-routing.module').then( m => m.AddReporteePageRoutingModule)
  },
  {
    path: 'approval',
    loadChildren: () => import('./approval/approval.module').then( m => m.ApprovalPageModule)
  },
  {
    path: 'add-approval',
    loadChildren: () => import('./approval/add-approval/add-approval-routing.module').then( m => m.AddApprovalPageRoutingModule)
  },
  {
    path: 'add-approval/:id/:view',
    loadChildren: () => import('./approval/add-approval/add-approval-routing.module').then( m => m.AddApprovalPageRoutingModule)
  },
  {
    path: 'edit-approval/:id/:view',
    loadChildren: () => import('./approval/edit-approval/edit-approval-routing.module').then( m => m.EditApprovalPageRoutingModule)
  },
  {
    path: 'add-reschedule',
    loadChildren: () => import('./reschedule/add-reschedule/add-reschedule-routing.module').then( m => m.AddReschedulePageRoutingModule)
  },
  {
    path: 'add-reschedule/:id/:view',
    loadChildren: () => import('./reschedule/add-reschedule/add-reschedule-routing.module').then( m => m.AddReschedulePageRoutingModule)
  },
  {
    path: 'reschedule',
    loadChildren: () => import('./reschedule/reschedule.module').then( m => m.ReschedulePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
