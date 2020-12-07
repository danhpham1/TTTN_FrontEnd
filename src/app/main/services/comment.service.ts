import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(data, token) {
    const httpHeaders: HttpHeaders = new HttpHeaders(
      { 'x-access-token': token }
    )
    return this.http.post(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIComments, { ...data }, { headers: httpHeaders });
  }

  getComment(productId){
    return this.http.get(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIComments + '/' + productId);
  }
}
