import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(private spiner:NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spiner.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spiner.hide();
          console.log("-------Event---->", event);
        }
        return event;
      })
    )
  }
}
