import { MenuList } from './../models/menu';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get<MenuList>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIMenu);
  }
}
