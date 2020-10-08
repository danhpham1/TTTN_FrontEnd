import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(data: User) {
    return this.http.post(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIUserRegister, { ...data });
  }

  loginUser(data: User) {
    return this.http.post(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIUserLogin, { ...data });
  }
}
