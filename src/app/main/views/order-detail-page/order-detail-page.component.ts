import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.css']
})
export class OrderDetailPageComponent implements OnInit {
  orderDetail$: Observable<Order>;
  environment = environment
  constructor(
    private orderService: OrderService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.localStorageService.getItemLocalStorage('token').subscribe(token => {
        this.orderDetail$ = this.orderService.getOrderDetail(params['id'], token).pipe(
          map(rs => rs.data)
        )
      })
    })
  }

  getTotal(orderList: Array<any>) {
    return orderList.reduce((total, el) => {
      return total += el.price * el.amout
    }, 0)
  }

}
