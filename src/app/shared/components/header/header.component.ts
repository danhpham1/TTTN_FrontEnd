import { MenuService } from './../../services/menu.service';
import { Menu } from './../../models/menu';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  menu$: Observable<Array<Menu>>;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menu$ = this.menuService.getMenu().pipe(
      map(data => [...data.data])
    )
  }

}
