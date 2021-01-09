import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { UIModule } from './../shared/ui/ui.module';
import { NgbDatepickerModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankModuleRoutingModule } from './bank-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AddApplicationComponent } from './add-application/add-application.component';

@NgModule({
  declarations: [ApplicantDashboardComponent, ApplicationComponent, DashboardComponent, AddApplicationComponent],
  imports: [
    CommonModule, LayoutsModule, UIModule, FormsModule, NgSelectModule, NgbProgressbarModule, NgApexchartsModule,
    BankModuleRoutingModule, NgbDatepickerModule, DataTablesModule
  ]
})
export class BankModuleModule { }
