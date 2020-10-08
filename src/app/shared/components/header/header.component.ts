import { LocalStorageService } from './../../../core/services/local-storage.service';
import { MenuService } from './../../services/menu.service';
import { Menu } from './../../models/menu';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  menu$: Observable<Array<Menu>>;
  user$: Observable<User>;
  constructor(private menuService: MenuService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.menu$ = this.menuService.getMenu().pipe(
      map(data => [...data.data])
    )
    this.user$ = this.localStorageService.getItemLocalStorage('userInfo');
  }

}
