import { TokenExpiredService } from './../../../core/services/token-expired.service';
import { NgForm } from '@angular/forms';
import { ToastrHelpService } from './../../../core/services/toastr-help.service';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { MenuService } from './../../services/menu.service';
import { Menu } from './../../models/menu';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  menu$: Observable<Array<Menu>>;
  user: User;
  @Input() cartItems: any

  @ViewChild('dropdownMenu') dropDown: ElementRef;
  constructor(private menuService: MenuService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrHelpService: ToastrHelpService,
    private tokenExpiredService: TokenExpiredService
  ) { }

  ngOnInit(): void {
    this.menu$ = this.menuService.getMenu().pipe(
      map(data => [...data.data])
    )
    this.localStorageService.getItemLocalStorage('userInfo').subscribe(user => {
      this.user = user;
    })
  }

  dropdown() {
    if (this.dropDown.nativeElement.classList.contains('hide')) {
      this.dropDown.nativeElement.classList.remove('hide');
      this.dropDown.nativeElement.classList.add('show');
    } else {
      this.dropDown.nativeElement.classList.remove('show');
      this.dropDown.nativeElement.classList.add('hide');
    }
  }

  signup() {
    this.toastrHelpService.showToastrSuccess('Đăng Xuất Thành Công', 'Đăng Xuất')
    this.localStorageService.removeItemLocalStorage('token').subscribe(() => { });
    this.localStorageService.removeItemLocalStorage('cart').subscribe(() => { });
    this.localStorageService.removeItemLocalStorage('userInfo').subscribe(rs => {
      this.localStorageService.getItemLocalStorage('returnURL').subscribe(url => {
        this.redirectTo(url.toString());
        this.localStorageService.getItemLocalStorage('userInfo').subscribe(user => {
          this.user = user;
        })
      })
    })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigateByUrl(uri));
  }

  onSubmitSearchForm(data) {
    console.log(data)
    if (data.value.search !== "") {
      this.router.navigateByUrl(`/search?title=${data.value.search}`);
    } else {
      this.toastrHelpService.showToastrWarning("Nhập tên sản phẩm bạn cần tìm", "Tìm Kiếm");
    }
  }

  expand() {
    let nav = document.querySelector('.wide-nav-mobi');
    if (!nav.classList.contains('nav-hide') && !nav.classList.contains('nav-show')) {
      nav.classList.add('nav-hide');
    }
    if (nav.classList.contains('nav-hide')) {
      nav.classList.remove('nav-hide');
      nav.classList.add('nav-show');
    } else {
      nav.classList.remove('nav-show');
      nav.classList.add('nav-hide');
    }
  }

  toggleUser() {
    let user = document.querySelector('.action-user');
    if (user.classList.contains('hide')) {
      user.classList.remove('hide');
      user.classList.add('show');
    } else {
      user.classList.remove('show');
      user.classList.add('hide');
    }
  }

}
