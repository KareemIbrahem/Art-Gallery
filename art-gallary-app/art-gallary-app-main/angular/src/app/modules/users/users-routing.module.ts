import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { userGuardGuard } from '../auth/guards/user-guard.guard';

const routes: Routes = [
  { path: 'cart', component: CartComponent , canActivate:[userGuardGuard]},
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'setting', component: UserHomeComponent , canActivate:[userGuardGuard] },
  { path: 'favorite', component: FavoriteComponent , canActivate:[userGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
