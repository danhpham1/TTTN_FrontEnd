import { ToastrHelpService } from './../services/toastr-help.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';


import { Router } from '@angular/router';


@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(
    private spiner: NgxSpinnerService,
    private roter: Router,
    private toastrHelpService: ToastrHelpService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spiner.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spiner.hide();
          console.log("-------Event---->", event);
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.spiner.hide();
        switch (err.status) {
          case 401:
            this.toastrHelpService.showToastrError('username hoặc password không đúng', 'Đăng nhập');
            this.roter.navigateByUrl('auth/login');
            return throwError(err);
          case 503:
            this.toastrHelpService.showToastrError('Đăng ký không thành công(username bị trùng)', 'Đăng ký');
            this.roter.navigateByUrl('auth/register');
            return throwError(err);
          default:
            return throwError(err);
        }
      })
    )
  }
}
