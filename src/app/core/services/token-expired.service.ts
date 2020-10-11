import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenExpiredService {

  constructor(private localStorageService: LocalStorageService) { }

  checkTokenExpired(token) {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token.toString(), 60 * 60);
  }
}
