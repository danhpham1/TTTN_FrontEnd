import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  product$: Observable<Array<Product>>;
  config: any;
  collection = { count: 0, data: [] };
  constructor(private route: ActivatedRoute, private produtService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params["name"] == 'all') {
        console.log(params);
        this.product$ = this.produtService.getProductWithType().pipe(map(rs => rs.data.reverse()));
        this.configPagenation();
      } else if (params["name"] == 'dong-ho-nam') {
        console.log(params);
        this.product$ = this.produtService.getProductWithType('nam').pipe(map(rs => rs.data.reverse()));
        this.configPagenation();
      } else if (params["name"] == 'dong-ho-nu') {
        this.product$ = this.produtService.getProductWithType('nu').pipe(map(rs => rs.data.reverse()));
        this.configPagenation();
      }
    })
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
