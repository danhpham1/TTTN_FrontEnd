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
        path: 'category',
        component: CategoryPageComponent
      },
      {
        path: 'product',
        component: ProductDetailPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
