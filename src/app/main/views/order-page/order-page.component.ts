import { ToastrHelpService } from './../../../core/services/toastr-help.service';
import { OrderService } from './../../services/order.service';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

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
  isSelectPay: boolean;
  isPhoneValid: boolean;
  isAddressValid: boolean;
  isAreaShip: boolean;
  costShip: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private router: Router,
    private toastrHelpService: ToastrHelpService
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
    this.isAddressValid = true;
    this.isPhoneValid = true;
    this.isConfirm = true;
    this.isSelectPay = true;
    this.isAreaShip = true;

    if (orderForm.value.comfirm == true && orderForm.value.pay && orderForm.value.phone && orderForm.value.address && orderForm.value.kvgh) {
      this.cartItem$.subscribe(rs => {
        let orderData = {
          ...orderForm.value,
          ...rs,
          totalInCart: +(this.getTotalInCart(rs.items)) + this.costShip
        }
        this.localStorageService.getItemLocalStorage('token').subscribe(token => {
          this.orderService.postOrder(orderData, token).subscribe(rs => {
            if (rs["success"] == true) {
              this.toastrHelpService.showToastrSuccess("Đặt hàng thành công", "Đơn đặt hàng");
              this.localStorageService.setItemLocalStorage("cart", {
                items: [],
              }).subscribe();
              // this.router.navigateByUrl('/home');
              window.location.href = '/home'
            }
          })
        })
      })
    } else {
      if (!orderForm.value.comfirm) {
        this.isConfirm = false;
      }
      if (!orderForm.value.pay) {
        this.isSelectPay = false;
      }
      if (!orderForm.value.phone) {
        this.isPhoneValid = false;
      }
      if (!orderForm.value.address) {
        this.isAddressValid = false;
      }
      if (!orderForm.value.kvgh) {
        this.isAreaShip = false;
      }
    }
  }

  changeValue(event) {
    console.log(event.target.value);
    if (event.target.value == 0) {
      this.costShip = 0;
    } else {
      this.costShip = 20000;
    }
  }
}
