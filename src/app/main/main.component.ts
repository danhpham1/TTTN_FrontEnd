import { ToastrHelpService } from './../core/services/toastr-help.service';
import { TokenExpiredService } from './../core/services/token-expired.service';
import { LocalStorageService } from './../core/services/local-storage.service';
import { ProductDetailPageComponent } from './views/product-detail-page/product-detail-page.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';
import { CartListPageComponent } from './views/cart-list-page/cart-list-page.component';
import { CartItem } from './../shared/models/cart';
import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { Subject } from 'rxjs';
import { HomePageComponent } from './views/home-page/home-page.component';
import { SearchPageComponent } from './views/search-page/search-page.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartItem: any = {
    items: [],
  }
  // cart$ = new Subject<Array<CartItem>>();

  constructor(
    private localStorageService: LocalStorageService,
    private tokenExpiredService: TokenExpiredService,
    private toastrHelpService: ToastrHelpService
  ) { }

  ngOnInit(): void {
    this.localStorageService.getItemLocalStorage('cart').subscribe(cart => {
      if (cart) {
        this.cartItem = cart
      } else {
        this.localStorageService.setItemLocalStorage('cart', this.cartItem).subscribe(() => { });
      }
    })
    this.tokenExpiredService.checkTokenExpired();
  }

  onActivate(componentReference) {
    if (componentReference instanceof CartListPageComponent) {
      this.localStorageService.getItemLocalStorage('cart').subscribe((rs) => {
        if (rs) {
          componentReference.cartItems = rs['items'];
        } else {
          componentReference.cartItems = this.cartItem;
        }
      })
      componentReference.deleteProduct.subscribe(item => {
        this.toastrHelpService.showToastrWarning("Xóa sản phẩm thành công", 'Giỏ hàng');
        let newCart = this.cartItem.items.filter(el => el.idProduct != item.idProduct);
        this.cartItem.items = newCart;
        this.localStorageService.setItemLocalStorage('cart', this.cartItem).subscribe(() => { });
      })
    }

    if (componentReference instanceof HomePageComponent ||
      componentReference instanceof CategoryPageComponent ||
      componentReference instanceof ProductDetailPageComponent ||
      componentReference instanceof SearchPageComponent
    ) {
      componentReference.addProduct.subscribe((data) => {
        this.toastrHelpService.showToastrWarning("Thêm giỏ hàng thành công", "Giỏ hàng");
        let productTemp = this.cartItem.items.find(el => el.idProduct == data._id);
        if (productTemp) {
          this.cartItem.items.map(el => {
            if (el.idProduct == data._id) {
              el.amout += 1;
            }
            return el;
          })
        } else {
          this.cartItem.items.push({
            idProduct: data._id,
            name: data.title,
            price: data.price,
            amout: 1,
            logo: data.logo,
            maxAmount: data.amount
          })
        }
        this.localStorageService.setItemLocalStorage('cart', this.cartItem).subscribe(() => { });
      })
    }
  }
}
