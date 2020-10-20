import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  {
    path: '', component: LayoutComponent, loadChildren: () => import('./treasurer/treasurer.module')
      .then(m => m.TreasurerModule), canActivate: [AuthGuard]
  },
  {
    path: 'property', component: LayoutComponent, loadChildren: () => import('./property/property.module')
      .then(m => m.PropertyModule), canActivate: [AuthGuard]
  },
  {
    path: 'property-document', component: LayoutComponent, loadChildren: () => import('./property-document/property-document.module')
      .then(m => m.PropertyDocumentModule), canActivate: [AuthGuard]
  },
  {
    path: 'property-legal-case', component: LayoutComponent, loadChildren: () => import('./legal-case/legal-case.module')
      .then(m => m.LegalCaseModule), canActivate: [AuthGuard]
  },
  {
    path: 'tenant', component: LayoutComponent, loadChildren: () => import('./tenant/tenant.module')
      .then(m => m.TenantModule), canActivate: [AuthGuard]
  }, {
    path: 'photograph', component: LayoutComponent, loadChildren: () => import('./photograph/photograph.module')
      .then(m => m.PhotographModule), canActivate: [AuthGuard]
  },
  {
    path: 'test', component: LayoutComponent, loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
