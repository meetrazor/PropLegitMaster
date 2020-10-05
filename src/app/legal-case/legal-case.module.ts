import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';

@NgModule({
  declarations: [AddLegalCaseComponent],
  imports: [
    CommonModule,
    LegalCaseRoutingModule
  ]
})
export class LegalCaseModule { }
