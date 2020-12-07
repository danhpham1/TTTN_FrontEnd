import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Location } from '@angular/common';
import { BrandService } from './../../services/brand.service';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { collapse } from '../../../shared/jquery/collapse.js';
import { Product } from 'src/app/shared/models/product';
import { find, map } from 'rxjs/operators';
import { BrandData } from 'src/app/shared/models/brand';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenExpiredService } from 'src/app/core/services/token-expired.service';
import { ToastrHelpService } from 'src/app/core/services/toastr-help.service';
import { User } from 'src/app/shared/models/user';
import {CommentService} from '../../services/comment.service';

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
  user$:Observable<User>;
  comment$:Observable<any>;
  environment = environment;
  productId:any;
  @Output() addProduct = new EventEmitter();

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private router: Router,
    private tokenExpiredService: TokenExpiredService,
    private toastrHelpService: ToastrHelpService,
    private commentService:CommentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.productId = params['id'];

      this.user$ = this.localStorageService.getItemLocalStorage('userInfo');

      this.product$ = this.productService.getProductDetail(params['id']).pipe(map(rs => rs['data']));

      this.localStorageService.setItemLocalStorage('returnURL', this.location.path()).subscribe(() => { });

      this.productRand$ = this.productService.getProductRandom('3').pipe(map(rs => rs.data));

      this.productService.getProductDetail(params['id']).pipe(map(rs => rs['data'])).subscribe(data => {
        this.brand$ = this.brandService.getBrand().pipe(
          map(rs => rs.data.find(el => el.title == data.brand))
        );
        collapse($);
      })

      this.comment$ = this.commentService.getComment(params['id']);
      let nav = document.querySelector('.wide-nav-mobi');
      nav.classList.remove('nav-show');
      nav.classList.add('nav-hide');
    })
  }

  addToCart(event) {
    this.addProduct.emit(event);
  }

  buy(product) {
    this.addProduct.emit(product);
    this.router.navigate(['cart']);
  }

  submitComment(comment){
    if(comment.value.comment){
      this.localStorageService.getItemLocalStorage('token').subscribe(token=>{
        if(token){
          let commentData = {
            username:comment.value.username,
            name:comment.value.name,
            comment:comment.value.comment,
            productId:this.productId
          }
          this.commentService.postComment(commentData,token).subscribe(rs=>{
            if(rs['success']){
              this.comment$ = this.commentService.getComment(this.productId);
              document.querySelector('#comment')['value'] = '';
            }
          });
        }
      })
    }else{
      this.toastrHelpService.showToastrWarning("Làm ơn nhập nội dung bình luận","Bình luận");
    }
  }
}
