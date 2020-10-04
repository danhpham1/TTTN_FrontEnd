import { ProductDetailPageComponent } from './views/product-detail-page/product-detail-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  declarations: [HomePageComponent, CategoryPageComponent, ProductDetailPageComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
