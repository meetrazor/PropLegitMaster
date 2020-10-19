import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreasurerRoutingModule } from './treasurer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyComponent } from './property/property.component';
import { UIModule } from '../shared/ui/ui.module';

@NgModule({
  declarations: [DashboardComponent, PropertyComponent],
  imports: [
    CommonModule,
    TreasurerRoutingModule,
    NgbDatepickerModule, FormsModule, UIModule, NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class TreasurerModule { }
