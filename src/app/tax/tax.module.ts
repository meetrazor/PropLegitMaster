import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { ViewTaxComponent } from './view-tax/view-tax.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [AddTaxComponent, ViewTaxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [AddTaxComponent,ViewTaxComponent]
})
export class TaxModule { }
