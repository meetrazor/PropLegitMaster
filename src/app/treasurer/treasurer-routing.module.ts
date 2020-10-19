import { PropertyListResolverService } from './../services/resolver/property-list-resolver.service';
import { PropertyComponent } from './property/property.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasurerRoutingModule { }
