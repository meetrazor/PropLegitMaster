import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyRoutingModule } from './property-routing.module';

@NgModule({
  declarations: [AddPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
  ]
})
export class PropertyModule { }
