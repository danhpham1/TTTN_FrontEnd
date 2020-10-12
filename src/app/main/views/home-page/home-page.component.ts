import { TokenExpiredService } from './../../../core/services/token-expired.service';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { ProductService } from './../../services/product.service';
import { environment } from './../../../../environments/environment';
import { Slider } from './../../../shared/models/slider';
import { SliderService } from './../../services/slider.service';
import { BrandService } from './../../services/brand.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { Product } from '../../../shared/models/product';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  slider$: Observable<Slider>;
  brand$: Observable<Brand>;
  home$: Observable<any>;
  watchMale$: Observable<Array<Product>>;
  watchFemale$: Observable<Array<Product>>;
  test: Array<Product>;
  environment = environment;

  @Output() addProduct = new EventEmitter();

  constructor(private brandService: BrandService,
    private sliderService: SliderService,
    private productService: ProductService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private tokenExpiredService: TokenExpiredService
  ) { }

  ngOnInit(): void {
    this.slider$ = this.sliderService.getSlider();
    this.brand$ = this.brandService.getBrand();
    this.watchMale$ = this.productService.getProductWithType('nam', '6').pipe(map(rs => rs.data));
    this.watchFemale$ = this.productService.getProductWithType('nu', '6').pipe(map(rs => rs.data));
    this.localStorageService.setItemLocalStorage('returnURL', this.location.path()).subscribe(() => { });
    this.localStorageService.getItemLocalStorage('token').subscribe(token => {
      if (token && this.tokenExpiredService.checkTokenExpired(token)) {
        this.localStorageService.removeItemLocalStorage('userInfo').subscribe(() => { });
        this.localStorageService.removeItemLocalStorage('token').subscribe(() => { });
        this.localStorageService.removeItemLocalStorage('cart').subscribe(() => { });
      }
    })
  }

  addToCart(event) {
    this.addProduct.emit(event);
  }
}
