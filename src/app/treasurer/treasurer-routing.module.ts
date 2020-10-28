import { PropertyListResolverService } from './../services/resolver/property-list-resolver.service';
import { PropertyComponent } from './property/property.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawyerComponent } from './lawyer/lawyer.component';
import {RentComponent} from './rent/rent.component';
import {LegalCaseComponent} from './legal-case/legal-case.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'property',
    component: PropertyComponent,
    resolve: { obj: PropertyListResolverService }
  },
  {
    path: 'lawyer',
    component: LawyerComponent
  },
  {
    path: 'rent',
    component: RentComponent
  },
  {
    path: 'legalcase',
    component: LegalCaseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasurerRoutingModule { }
