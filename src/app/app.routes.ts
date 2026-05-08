import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { Account } from './components/account/account';
import { Admin } from './components/admin/admin';
import { MannageProducts } from './components/admin/mannage-products/mannage-products';
import { MannageOrders } from './components/admin/mannage-orders/mannage-orders';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  // { path: 'login', component: Login },
  // { path: 'register', component: Register },
  { path: 'product-details/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'account', component: Account },
  { path: 'admin', component: Admin , canActivate: [adminGuard],
    children: [
    {path: 'products', component: MannageProducts},
    {path: 'orders', component: MannageOrders}]
  },
  
  { path: '**', redirectTo: 'home' }
];
