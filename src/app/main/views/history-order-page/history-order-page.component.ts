import { Order, OrderHistory } from './../../../shared/models/order';
import { Observable } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-order-page',
  templateUrl: './history-order-page.component.html',
  styleUrls: ['./history-order-page.component.css']
})
export class HistoryOrderPageComponent implements OnInit {

  orderList$: Observable<Array<Order>>

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.localStorageService.getItemLocalStorage('token').subscribe(token => {
        this.orderList$ = this.orderService.getOrderWithUsername(params['username'], token).pipe(
          map(rs => rs.data)
        )
      })
    })
  }

}
