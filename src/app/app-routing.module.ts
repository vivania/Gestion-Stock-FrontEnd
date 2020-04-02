import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PaniersComponent } from './paniers/paniers.component';
import { ClientComponent } from './client/client.component';


const routes: Routes = [
{path: 'products/:p1/:p2', component: ProductComponent},
{path: '', redirectTo: 'products/1/0', pathMatch: 'full'},
{path: 'login', component: LoginComponent},
{path: 'product-detail/:url', component: ProductDetailComponent},
{path: 'panier', component: PaniersComponent},
{path: 'client', component: ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const allComponent = [
  ProductComponent,
  LoginComponent,
  ProductDetailComponent,
  PaniersComponent,
  ClientComponent
];
