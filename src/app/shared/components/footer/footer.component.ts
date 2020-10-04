import { Component, OnInit } from '@angular/core';
import { scrollTop } from '../../jquery/scroll.js';
declare var $: any;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //jquery
    scrollTop($);
  }

}
