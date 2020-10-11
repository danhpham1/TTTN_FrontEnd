import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart-list-page',
  templateUrl: './cart-list-page.component.html',
  styleUrls: ['./cart-list-page.component.css']
})
export class CartListPageComponent implements OnInit {
  cartItems: Array<CartItem>;
  environment = environment;

  @Output() deleteProduct = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.cartItems);
  }

  deleteProductInCart(item) {
    this.cartItems = this.cartItems.filter(el => el.idProduct != item.idProduct);
    this.deleteProduct.emit(item);
  }


}
