import { PhotographModule } from './../photograph/photograph.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UIModule } from '../shared/ui/ui.module';
import { SinglePropertyViewComponent } from './single-property-view/single-property-view.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import {TaxModule} from './../tax/tax.module';
import { LegalCaseModule } from '../legal-case/legal-case.module';

@NgModule({
  declarations: [AddPropertyComponent, EditPropertyComponent, SinglePropertyViewComponent, ViewPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule, UIModule, NgbTabsetModule, PhotographModule, TaxModule, LegalCaseModule
  ]
})
export class PropertyModule { }
