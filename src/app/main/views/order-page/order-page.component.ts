import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  userInfo$: Observable<User>;
  cartItem$: Observable<any>;
  environment = environment;

  isConfirm: boolean;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.localStorageService.getItemLocalStorage('userInfo');
    this.cartItem$ = this.localStorageService.getItemLocalStorage('cart');
  }

  getTotalInCart(items) {
    if (items) {
      return items.reduce((total, el) => {
        return total += el.amout * el.price
      }, 0)
    } else {
      return 0;
    }
  }

  postOrder(orderForm) {
    if (orderForm.value.comfirm) {
      this.isConfirm = true;
      this.cartItem$.subscribe(rs => {
        let orderData = {
          ...orderForm.value,
          ...rs,
          totalInCart: this.getTotalInCart(rs.items)
        }
        console.log(orderData);
      })
    } else {
      this.isConfirm = false;
    }
  }
}
