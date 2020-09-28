import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreasurerRoutingModule } from './treasurer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TreasurerRoutingModule,
    NgbDatepickerModule, FormsModule
  ]
})
export class TreasurerModule { }
