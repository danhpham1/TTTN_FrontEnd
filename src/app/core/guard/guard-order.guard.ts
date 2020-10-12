import { map } from 'rxjs/operators';
import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardOrderGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.localStorageService.getItemLocalStorage('token').pipe(
      map(token => {
        if (token) {
          return true;
        } else {
          this.router.navigateByUrl('auth/login');
          return false;
        }
      })
    )
  }

}
