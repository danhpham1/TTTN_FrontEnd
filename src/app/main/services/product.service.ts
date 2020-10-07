import { ProductResponse } from './../../shared/models/product';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProductWithType(type?: string, brand?: string, size?: string) {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    if (brand) {
      params = params.set('brand', brand);
    }
    if (size) {
      params = params.set('size', size);
    }
    return this.http.get<ProductResponse>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIProduct, { params });
  }

  getProductDetail(id: string) {
    return this.http.get(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIProduct + '/' + id);
  }

  getProductRandom(size?: string) {
    let params = new HttpParams();
    if (size) {
      params = params.set('size', size);
    }
    return this.http.get<ProductResponse>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIProduct + '/getrandom', { params });
  }
}
