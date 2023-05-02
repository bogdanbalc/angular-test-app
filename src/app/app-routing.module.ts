import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: { layout: 'empty' },
  },
  { path: 'login', component: LoginComponent, data: { layout: 'empty' } },
  { path: 'welcome', component: WelcomeComponent, data: { layout: 'default' } },
  {
    path: 'new-product',
    component: NewProductComponent,
    data: { layout: 'default' },
  },
  { path: 'sales', component: SalesComponent, data: { layout: 'default' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
