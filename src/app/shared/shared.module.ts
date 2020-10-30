import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    UIModule, DataTablesModule, RouterModule
  ],
  exports: [DatatableComponent]
})
export class SharedModule { }
