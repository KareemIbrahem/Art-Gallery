import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { StarsRatingComponent } from './components/stars-rating/stars-rating.component';
import { CartComponent } from './components/cart/cart.component';
import { AngularMatModule } from 'src/app/shared/modules/angular-mat/angular-mat.module';
import { ShopComponent } from './components/shop/shop.component';
import { ProductComponent } from './components/product/product.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';


@NgModule({
  declarations: [
    UsersComponent,
    ProductDetailsComponent,
    StarsRatingComponent,
    CartComponent,
    ShopComponent,
    ProductComponent,
    UserHomeComponent,
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMatModule
  ],
  exports:[StarsRatingComponent,ProductComponent]
})
export class UsersModule { }
