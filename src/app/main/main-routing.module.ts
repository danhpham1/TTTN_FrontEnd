import { SearchPageComponent } from './views/search-page/search-page.component';
import { GuardOrderGuard } from './../core/guard/guard-order.guard';
import { OrderPageComponent } from './views/order-page/order-page.component';
import { CartListPageComponent } from './views/cart-list-page/cart-list-page.component';
import { ProductDetailPageComponent } from './views/product-detail-page/product-detail-page.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'category/:name',
        component: CategoryPageComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailPageComponent
      },
      {
        path: 'cart',
        component: CartListPageComponent
      },
      {
        path: 'order',
        component: OrderPageComponent,
        canActivate: [GuardOrderGuard]
      },
      {
        path: 'search',
        component: SearchPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
