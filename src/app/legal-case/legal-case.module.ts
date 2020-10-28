import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewLegalCaseComponent } from './view-legal-case/view-legal-case.component';
import { DetailsLegalCaseComponent } from './details-legal-case/details-legal-case.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddLegalCaseComponent, ViewLegalCaseComponent, DetailsLegalCaseComponent],
  imports: [
    CommonModule,
    LegalCaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgbTabsetModule
  ],
  exports: [AddLegalCaseComponent, ViewLegalCaseComponent]
})
export class LegalCaseModule { }
