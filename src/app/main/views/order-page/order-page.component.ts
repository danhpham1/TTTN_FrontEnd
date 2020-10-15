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
    if (orderForm.value.comfirm) {
      this.isConfirm = true;
      this.cartItem$.subscribe(rs => {
        let orderData = {
          ...orderForm.value,
          ...rs,
          totalInCart: this.getTotalInCart(rs.items)
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
      this.isConfirm = false;
    }
  }
}
