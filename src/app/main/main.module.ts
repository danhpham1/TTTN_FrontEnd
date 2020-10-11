import { ProductDetailPageComponent } from './views/product-detail-page/product-detail-page.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { HomePageComponent } from './views/home-page/home-page.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartListPageComponent } from './views/cart-list-page/cart-list-page.component';





@NgModule({
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ProductDetailPageComponent,
    ProductCardComponent,
    CartListPageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxPaginationModule
  ],
})
export class MainModule { }
