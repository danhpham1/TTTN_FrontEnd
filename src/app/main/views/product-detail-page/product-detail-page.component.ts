import { BrandService } from './../../services/brand.service';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { collapse } from '../../../shared/jquery/collapse.js';
import { Product } from 'src/app/shared/models/product';
import { find, map } from 'rxjs/operators';
import { BrandData } from 'src/app/shared/models/brand';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  product$: Observable<Product>;
  productRand$: Observable<Array<Product>>;
  brand$: Observable<BrandData>;
  environment = environment
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product$ = this.productService.getProductDetail(params['id']).pipe(map(rs => rs['data']));
      this.productRand$ = this.productService.getProductRandom('3').pipe(map(rs => rs.data));
      this.productService.getProductDetail(params['id']).pipe(map(rs => rs['data'])).subscribe(data => {
        this.brand$ = this.brandService.getBrand().pipe(
          map(rs => rs.data.find(el => el.title == data.brand))
        );
        collapse($);
      })
    })
  }
}
