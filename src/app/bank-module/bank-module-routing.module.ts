import { GeneratePVRReportComponent } from './generate-pvr-report/generate-pvr-report.component';
import { PvrReportComponent } from './pvr-report/pvr-report.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { AddApplicationComponent } from './add-application/add-application.component';

import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { ViewDocumentComponent } from './view-document/view-document.component';

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
    path: 'title-search/:id',
    component: ApplicantDashboardComponent
  }, {
    path: 'addapplication',
    component: AddApplicationComponent
  }, {
    //   path: 'viewdocument/:url/:filetype',
    //   component: ViewDocumentComponent
    // }, {
    path: 'viewdocument/:propertyid/:id',
    component: ViewDocumentComponent
  }, {
    path: 'uploaddocument/:Appid',
    component: UploadDocumentComponent
  }, {
    path: 'PVRreport/:Appid',
    component: PvrReportComponent
  }, {
    path: 'GeneratePVR/:AppID',
    component: GeneratePVRReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankModuleRoutingModule { }
