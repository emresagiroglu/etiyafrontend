import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { CustomerSearchComponent } from './shared/components/customer-search/customer-search.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'customer-search', component: CustomerSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
