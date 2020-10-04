import { Component, OnInit } from '@angular/core';
import { collapse } from '../../../shared/jquery/collapse.js';
declare var $: any

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    collapse($);
  }

}
