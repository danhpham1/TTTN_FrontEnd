import { ProductResponse } from './../../shared/models/product';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearchProduct(title: string) {
    return this.http.get<ProductResponse>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APISearchProduct + '?title=' + title);
  }
}
