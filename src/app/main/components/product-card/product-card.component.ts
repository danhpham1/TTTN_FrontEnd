import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  environment = environment;
  constructor() { }

  ngOnInit(): void {

  }

}
