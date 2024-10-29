import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { CustomerSearchComponent } from './shared/components/customer-search/customer-search.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { CustomerCreateComponent } from './shared/components/customer-create/customer-create.component';
import { AddressInfoComponent } from './shared/components/address-info/address-info.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'customer-search', component: CustomerSearchComponent },
  { path: 'customer-create', component: CustomerCreateComponent },
  { path: 'address-info', component: AddressInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
