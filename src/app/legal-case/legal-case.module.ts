import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';
import { ViewLegalCaseComponent } from './view-legal-case/view-legal-case.component';
import { UIModule } from '../shared/ui/ui.module';
import { DetailsLegalCaseComponent } from './details-legal-case/details-legal-case.component';
import { SharedModule } from '../shared/shared.module';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddLegalCaseComponent, ViewLegalCaseComponent, DetailsLegalCaseComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,
    LegalCaseRoutingModule, UIModule, SharedModule, NgbTabsetModule
  ], exports: [AddLegalCaseComponent, ViewLegalCaseComponent]
})
export class LegalCaseModule { }
