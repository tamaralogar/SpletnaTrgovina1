import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Komponente
import { Login } from './features/authentication/pages/login/login/login';
import { Signup } from './features/authentication/pages/signup/signup/signup';
import { ItemsOverview } from './features/items/pages/items-overview/items-overview/items-overview';
import { ItemsDetails } from './features/items/pages/items-details/items-details/items-details';
import { Basket } from './features/items/pages/basket/basket/basket';
import { Checkout } from './features/items/pages/checkout/checkout';

//Guards
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {    path: '', redirectTo: '/items', pathMatch: 'full' },
  {    path: 'login', component: Login   },
  {    path: 'signup', component: Signup   },
  {    path: 'items', component: ItemsOverview, canActivate: [AuthGuard]   },
  {    path: 'items/details', component: ItemsDetails, canActivate: [AuthGuard]   },
  {    path: 'items/basket', component: Basket, canActivate: [AuthGuard] },
  {    path: 'checkout', component: Checkout, canActivate: [AuthGuard] },
  {    path: '**', redirectTo: '/items'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
