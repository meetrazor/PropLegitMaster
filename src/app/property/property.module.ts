import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [AddPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class PropertyModule { }
