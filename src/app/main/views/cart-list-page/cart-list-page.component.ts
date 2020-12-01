import { Location } from '@angular/common';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart-list-page',
  templateUrl: './cart-list-page.component.html',
  styleUrls: ['./cart-list-page.component.css']
})
export class CartListPageComponent implements OnInit {
  cartItems: Array<any>;
  environment = environment;
  totalInCart: any = 0;

  @Output() deleteProduct = new EventEmitter();
  @Output() changeAmoutProduct = new EventEmitter();

  constructor(
    private localStorageService: LocalStorageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.localStorageService.setItemLocalStorage('returnURL', this.location.path()).subscribe(() => { });
    this.getTotalCart();
  }

  deleteProductInCart(item) {
    this.cartItems = this.cartItems.filter(el => el.idProduct != item.idProduct);
    this.getTotalCart()
    this.deleteProduct.emit(item);
  }

  getTotalCart() {
    this.localStorageService.getItemLocalStorage('cart').subscribe(cartItems => {
      if (this.cartItems) {
        console.log(this.cartItems);
        this.totalInCart = this.cartItems.reduce((total, el) => {
          return total += (el.amout * el.price)
        }, 0)
      }
    })
  }

  changeAmount(event, idProduct, max) {
    if (event.target.value > max) {
      event.target.value = max;
    }
    this.cartItems.map(el => {
      if (el.idProduct == idProduct) {
        return el.amout = event.target.value
      }
    })
    this.localStorageService.setItemLocalStorage('cart', { items: this.cartItems }).subscribe(() => { });
    this.getTotalCart();
    this.changeAmoutProduct.emit({ amout: event.target.value, id: idProduct });
  }
}
