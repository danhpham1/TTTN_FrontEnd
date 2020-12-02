import { Order, OrderHistory } from './../../../shared/models/order';
import { Observable } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ToastrHelpService } from 'src/app/core/services/toastr-help.service';

@Component({
  selector: 'app-history-order-page',
  templateUrl: './history-order-page.component.html',
  styleUrls: ['./history-order-page.component.css']
})
export class HistoryOrderPageComponent implements OnInit {

  orderList$: Observable<Array<Order>>;
  token: any;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private toastrHelpService: ToastrHelpService,
  ) { }

  ngOnInit(): void {
    this.getHistoryOrder();
  }

  getHistoryOrder() {
    this.route.params.subscribe(params => {
      this.localStorageService.getItemLocalStorage('token').subscribe(token => {
        this.token = token;
        this.orderList$ = this.orderService.getOrderWithUsername(params['username'], token).pipe(
          map(rs => rs.data)
        )
      })
    })
  }

  cancelOrder(id: string) {
    this.orderService.patchOrderDetail(id, this.token).subscribe(rs => {
      if (rs.success) {
        this.toastrHelpService.showToastrWarning("Hủy đơn hàng thành công", "Hủy đơn hàng");
        this.getHistoryOrder();
      } else {
        this.toastrHelpService.showToastrWarning("Hủy đơn hàng thất bại", "Hủy đơn hàng");
      }
    })
  }

}
