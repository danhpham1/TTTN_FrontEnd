import { CartListPageComponent } from './views/cart-list-page/cart-list-page.component';
import { CartItem } from './../shared/models/cart';
import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartItem: Cart = {
    items: [],
  }
  // cart$ = new Subject<Array<CartItem>>();

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(componentReference) {
    if (componentReference instanceof CartListPageComponent) {
      componentReference.cartItems = this.cartItem.items;
    } else {
      componentReference.addProduct.subscribe((data) => {
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
            amout: 1
          })
        }
        // this.cart$.next(this.cartItem.items);
        console.log(this.cartItem);
      })
    }
  }
}
