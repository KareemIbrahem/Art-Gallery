import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { CategoryComponent } from './components/category/category.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularMatModule } from 'src/app/shared/modules/angular-mat/angular-mat.module';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CategoryComponent,
    SingleProductComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMatModule
  ]
})
export class AdminModule { }
