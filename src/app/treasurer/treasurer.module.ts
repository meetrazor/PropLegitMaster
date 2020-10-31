import { DataTablesModule } from 'angular-datatables';
import { RentModule } from './../rent/rent.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TreasurerRoutingModule } from './treasurer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyComponent } from './property/property.component';
import { UIModule } from '../shared/ui/ui.module';
import { LawyerComponent } from './lawyer/lawyer.component';
import { RentComponent } from './rent/rent.component';

@NgModule({
  declarations: [DashboardComponent, PropertyComponent, LawyerComponent, RentComponent],
  imports: [
    CommonModule,
    TreasurerRoutingModule,
    NgbDatepickerModule, FormsModule, UIModule, NgbPaginationModule, DataTablesModule, SharedModule, DataTablesModule,
    NgbTypeaheadModule, RentModule
  ], exports: [RentComponent, LawyerComponent], providers: [DatePipe]
})
export class TreasurerModule { }
