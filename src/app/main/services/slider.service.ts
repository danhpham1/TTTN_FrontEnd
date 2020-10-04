import { environment } from './../../../environments/environment';
import { Slider } from './../../shared/models/slider';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }


  getSlider() {
    return this.http.get<Slider>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APISlider);
  }

}
