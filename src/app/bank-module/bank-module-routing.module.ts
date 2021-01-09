import { AddApplicationComponent } from './add-application/add-application.component';

import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'applications',
    component: ApplicationComponent
  },
  {
    path: 'title-search',
    component: ApplicantDashboardComponent
  }, {
    path: 'addapplication',
    component: AddApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankModuleRoutingModule { }
