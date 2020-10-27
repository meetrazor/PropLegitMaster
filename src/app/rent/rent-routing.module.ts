import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRentComponent } from './add-rent/add-rent.component';
import { ViewRentComponent } from './view-rent/view-rent.component';
const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: AddRentComponent },
    {path: 'view/:id', component: ViewRentComponent},
    {path: 'edit/:id', component: AddRentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
