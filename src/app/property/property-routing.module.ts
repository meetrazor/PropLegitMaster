import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import {EditPropertyComponent} from './edit-property/edit-property.component';
const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path : 'create', component : AddPropertyComponent},
  {path: 'edit/:id', component : EditPropertyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
