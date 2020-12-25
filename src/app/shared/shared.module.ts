import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { DatatableComponent } from './datatable/datatable.component';
import { UploadReceiptComponent } from './upload-receipt/upload-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [DatatableComponent, UploadReceiptComponent],
  imports: [
    CommonModule,
    UIModule, DataTablesModule, RouterModule, FormsModule, FileUploadModule, ReactiveFormsModule, NgSelectModule
  ],
  exports: [DatatableComponent, UploadReceiptComponent]
})
export class SharedModule { }
