import { TokenExpiredService } from './../../../core/services/token-expired.service';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './../../services/search.service';
import { Product, ProductResponse } from './../../../shared/models/product';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  product$: Observable<Array<Product>>;
  config: any;
  collection = { count: 0, data: [] };
  @Output() addProduct = new EventEmitter();

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private tokenExpiredService: TokenExpiredService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(querys => {
      this.product$ = this.searchService.getSearchProduct(querys['title']).pipe(map(rs => rs.data.reverse()))
      this.configPagenation();
      let nav = document.querySelector('.wide-nav-mobi');
      nav.classList.remove('nav-show');
      nav.classList.add('nav-hide');
    })
  }

  addToCart(event) {
    this.addProduct.emit(event);
  }

  configPagenation() {
    this.product$.subscribe(rs => {
      this.collection.count = rs.length;
      this.collection.data = rs;
      this.setConfig();
    });
    this.setConfig();
  }

  setConfig() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    }
  }

  pageChanged(event) {
    window.scrollTo(0, 0);
    this.config.currentPage = event;
  }
}
