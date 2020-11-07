import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import { LegalCaseRoutingModule } from './legal-case-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewLegalCaseComponent } from './view-legal-case/view-legal-case.component';
import { DetailsLegalCaseComponent } from './details-legal-case/details-legal-case.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatDialogModule} from '@angular/material/dialog';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { HearingComponent } from './hearing/hearing.component';
import { LawyerComponent } from './lawyer/lawyer.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [AddLegalCaseComponent, ViewLegalCaseComponent, DetailsLegalCaseComponent,
    HearingComponent, LawyerComponent, DocumentsComponent],
  imports: [
    CommonModule,
    LegalCaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgbTabsetModule, MatMenuModule,
    FileUploadModule, MatDialogModule,
    ModalModule.forRoot(), MatIconModule,
    AutocompleteLibModule
  ],
  entryComponents: [HearingComponent, LawyerComponent, DocumentsComponent],
  exports: [AddLegalCaseComponent, ViewLegalCaseComponent]
})
export class LegalCaseModule { }
