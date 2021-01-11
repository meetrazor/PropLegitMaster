import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from './../shared/ui/ui.module';
import { NgbAccordionModule, NgbDatepickerModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankModuleRoutingModule } from './bank-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PvrReportComponent } from './pvr-report/pvr-report.component';

@NgModule({
  declarations: [ApplicantDashboardComponent, ApplicationComponent,
    DashboardComponent, AddApplicationComponent, ViewDocumentComponent, UploadDocumentComponent, PvrReportComponent],
  imports: [
    CommonModule, LayoutsModule, UIModule, FormsModule, NgSelectModule, NgbProgressbarModule, NgApexchartsModule, NgbAccordionModule,
    BankModuleRoutingModule, NgbDatepickerModule, DataTablesModule,
    ReactiveFormsModule, FormsModule, AutocompleteLibModule, FileUploadModule,
    PdfViewerModule,
  ]
})
export class BankModuleModule { }
