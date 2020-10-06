import { ProductResponse } from './../../shared/models/product';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  getProductWithType(type?: string, size?: number) {
    if (type && size) {
      return this.http.get<ProductResponse>(`${environment.EndPointAPI}${environment.APIPrefix}${environment.APIVersion}${environment.APIProduct}?type=${type}&size=${size}`);
    } else if (type || size) {
      if (type) {
        return this.http.get<ProductResponse>(`${environment.EndPointAPI}${environment.APIPrefix}${environment.APIVersion}${environment.APIProduct}?type=${type}`);
      } else {
        return this.http.get<ProductResponse>(`${environment.EndPointAPI}${environment.APIPrefix}${environment.APIVersion}${environment.APIProduct}?size=${size}`);
      }
    } else {
      return this.http.get<ProductResponse>(`${environment.EndPointAPI}${environment.APIPrefix}${environment.APIVersion}${environment.APIProduct}`);
    }
  }
}
