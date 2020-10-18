import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrHelpService {

  constructor(
    private toastrService: ToastrService
  ) { }

  showToastrError(message: string, title: string) {
    this.toastrService.error(message, title, {
      timeOut: 2000,
      easing: 'ease-in',
      easeTime: 400
    })
  }

  showToastrSuccess(message: string, title: string) {
    this.toastrService.success(message, title, {
      timeOut: 2000,
      easing: 'ease-in',
      easeTime: 400
    })
  }

  showToastrWarning(message: string, title: string) {
    this.toastrService.warning(message, title, {
      timeOut: 2000,
      easing: 'ease-in',
      easeTime: 400
    })
  }
}
