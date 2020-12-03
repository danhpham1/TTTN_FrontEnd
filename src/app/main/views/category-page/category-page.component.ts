import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Location } from '@angular/common';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { map } from 'rxjs/operators';
import { TokenExpiredService } from 'src/app/core/services/token-expired.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  product$: Observable<Array<Product>>;
  config: any;
  collection = { count: 0, data: [] };
  titleNamePageActive: string;
  brandNamePageActive: string;

  @Output() addProduct = new EventEmitter();

  constructor(private route: ActivatedRoute,
    private produtService: ProductService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private tokenExpiredService: TokenExpiredService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(querys => {
        this.localStorageService.setItemLocalStorage('returnURL', this.location.path()).subscribe(() => { });
        this.localStorageService.getItemLocalStorage('returnURL').subscribe(url => { console.log(url) });
        let type: string;
        let brand: string;
        if (params["name"] == 'all') {
          type = '';
          this.titleNamePageActive = 'all';
          if (querys['brand']) {
            brand = querys['brand'];
            this.brandNamePageActive = brand;
          }
        } else if (params["name"] == 'dong-ho-nam') {
          type = 'nam';
          this.titleNamePageActive = type;
          if (querys['brand']) {
            brand = querys['brand'];
            this.brandNamePageActive = brand;
          }
        } else if (params["name"] == 'dong-ho-nu') {
          type = 'nu';
          this.titleNamePageActive = type;
          if (querys['brand']) {
            brand = querys['brand'];
            this.brandNamePageActive = brand;
          } else {
            this.titleNamePageActive = querys['brand'];
          }
        }
        this.callGetProductService(type, brand);
        let nav = document.querySelector('.wide-nav-mobi');
        nav.classList.remove('nav-show');
        nav.classList.add('nav-hide');
      })
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

  callGetProductService(type?: string, brand?: string, size?: string) {
    this.product$ = this.produtService.getProductWithType(type, brand, size).pipe(map(rs => rs.data.reverse()));
    this.configPagenation();
  }

  // signup() {
  //   this.localStorageService.removeItemLocalStorage('userInfo');
  //   this.localStorageService.removeItemLocalStorage('token');
  //   this.localStorageService.removeItemLocalStorage('cart');
  // }

}
