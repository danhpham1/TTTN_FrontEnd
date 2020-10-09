import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart-list-page',
  templateUrl: './cart-list-page.component.html',
  styleUrls: ['./cart-list-page.component.css']
})
export class CartListPageComponent implements OnInit {
  cartItems: Array<CartItem>

  constructor() { }

  ngOnInit(): void {
    console.log(this.cartItems);
  }


}
