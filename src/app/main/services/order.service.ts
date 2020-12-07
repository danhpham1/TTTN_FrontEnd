import * as OrderHistory from './../../shared/models/order';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  postOrder(data, token) {
    const httpHeaders: HttpHeaders = new HttpHeaders(
      { 'x-access-token': token }
    )
    return this.http.post(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APICreateOrder, { ...data }, { headers: httpHeaders });
  }

  getOrderWithUsername(username: string, token) {
    const httpHeaders: HttpHeaders = new HttpHeaders(
      { 'x-access-token': token }
    )
    return this.http.get<OrderHistory.OrderList>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APICreateOrder + "/" + username, { headers: httpHeaders })
  }

  getOrderDetail(id: string, token) {
    const httpHeaders: HttpHeaders = new HttpHeaders(
      { 'x-access-token': token }
    )
    return this.http.get<OrderHistory.OrderDetail>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIOrderDetail + '/' + id, { headers: httpHeaders })
  }

  patchOrderDetail(id: string, token: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders(
      { 'x-access-token': token }
    )
    return this.http.patch<any>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APICreateOrder, { id: id }, { headers: httpHeaders });
  }
}
