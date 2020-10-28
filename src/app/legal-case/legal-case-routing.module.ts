import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLegalCaseComponent } from './add-legal-case/add-legal-case.component';
import {ViewLegalCaseComponent} from './view-legal-case/view-legal-case.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path : 'create', component : AddLegalCaseComponent},
  {path: 'view/:id', component: ViewLegalCaseComponent},
  {path: 'edit/:id', component: AddLegalCaseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalCaseRoutingModule { }
