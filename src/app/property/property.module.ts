import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule
  ]
})
export class PropertyModule { }
