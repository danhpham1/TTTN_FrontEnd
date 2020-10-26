import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostWithNumberPost(number: number) {
    return this.http.get<any>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIPosts).pipe(
      take(number),
      map(rs => rs.data)
    )
  }

  getAllPost() {
    return this.http.get<any>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIPosts).pipe(
      map(rs => rs.data)
    )
  }

  getPostDetailById(id: string) {
    return this.http.get<any>(environment.EndPointAPI + environment.APIPrefix + environment.APIVersion + environment.APIPostDetail + '/' + id).pipe(
      map(rs => rs.data)
    )
  }
}
