import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenExpiredService {

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  checkTokenExpired() {
    this.localStorageService.getItemLocalStorage('token').subscribe(token => {
      if (token) {
        console.log(token);
        this.http.get(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APICheckToken + '/' + token).pipe(
          map(rs => {
            return rs['isTokenExpired']
          })
        ).subscribe(rs => {
          // console.log(rs);
          if (!rs) {
            this.localStorageService.removeItemLocalStorage('userInfo').subscribe(() => { });
            this.localStorageService.removeItemLocalStorage('cart').subscribe(() => { });
            this.localStorageService.removeItemLocalStorage('token').subscribe(() => { });
          }
        })
      }
    })
  }
}
