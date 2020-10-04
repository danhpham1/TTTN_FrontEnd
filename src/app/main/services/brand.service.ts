import { environment } from './../../../environments/environment';
import { Brand } from './../../shared/models/brand';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrand() {
    return this.http.get<Brand>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIBrand);
  }

}
