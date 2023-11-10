import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { UsersComponent } from './components/users/users.component';
import { adminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent , canActivate:[adminGuard] },
  { path: 'category', component: CategoryComponent, canActivate:[adminGuard] },
  { path: 'product', component: SingleProductComponent, canActivate:[adminGuard] },
  { path: 'users', component: UsersComponent, canActivate:[adminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
