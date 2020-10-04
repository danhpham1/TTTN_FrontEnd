import { environment } from './../../../../environments/environment';
import { Slider } from './../../../shared/models/slider';
import { SliderService } from './../../services/slider.service';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  slider$: Observable<Slider>;
  brand$: Observable<Brand>;
  home$: Observable<any>;
  environment = environment;
  constructor(private brandService: BrandService, private sliderService: SliderService) { }

  ngOnInit(): void {
    this.home$ = forkJoin(
      this.slider$ = this.sliderService.getSlider(),
      this.brand$ = this.brandService.getBrand(),
    )
  }

}
