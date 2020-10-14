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
    console.log(environment.APICreateOrder);
    return this.http.post(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APICreateOrder, { ...data }, { headers: httpHeaders });
  }
}
