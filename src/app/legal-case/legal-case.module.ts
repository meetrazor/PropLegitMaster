import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [AddLegalCaseComponent],
  imports: [
    CommonModule, PdfViewerModule,
    LegalCaseRoutingModule
  ]
})
export class LegalCaseModule { }
