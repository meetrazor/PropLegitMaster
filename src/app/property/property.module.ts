import { UiModule } from './../pages/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UIModule } from '../shared/ui/ui.module';
import { EditPropertyComponent } from './edit-property/edit-property.component';

@NgModule({
  declarations: [AddPropertyComponent, EditPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule, UIModule
  ]
})
export class PropertyModule { }
