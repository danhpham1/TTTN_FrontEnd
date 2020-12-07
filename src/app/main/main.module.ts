import { ProductDetailPageComponent } from './views/product-detail-page/product-detail-page.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { HomePageComponent } from './views/home-page/home-page.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartListPageComponent } from './views/cart-list-page/cart-list-page.component';
import { OrderPageComponent } from './views/order-page/order-page.component';
import { SearchPageComponent } from './views/search-page/search-page.component';
import { HistoryOrderPageComponent } from './views/history-order-page/history-order-page.component';
import { OrderDetailPageComponent } from './views/order-detail-page/order-detail-page.component';
import { PostCategoryPageComponent } from './views/post-category-page/post-category-page.component';
import { PostDetailPageComponent } from './views/post-detail-page/post-detail-page.component';
import { ProductCommentComponent } from './components/product-comment/product-comment.component';





@NgModule({
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ProductDetailPageComponent,
    ProductCardComponent,
    CartListPageComponent,
    OrderPageComponent,
    SearchPageComponent,
    HistoryOrderPageComponent,
    OrderDetailPageComponent,
    PostCategoryPageComponent,
    PostDetailPageComponent,
    ProductCommentComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
})
export class MainModule { }
