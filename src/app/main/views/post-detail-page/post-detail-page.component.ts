import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.css']
})
export class PostDetailPageComponent implements OnInit {
  post$: Observable<any>;
  postList$: Observable<any>;
  parser = new DOMParser();
  environment = environment

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.post$ = this.postService.getPostDetailById(params['id']);
      this.postList$ = this.postService.getAllPost();
      let nav = document.querySelector('.wide-nav-mobi');
      nav.classList.remove('nav-show');
      nav.classList.add('nav-hide');
    })
  }

  // changUrlImg(content: string) {
  //   let changeSrcImg = this.parser.parseFromString(content, 'text/html');
  //   changeSrcImg.body.querySelectorAll("img").forEach(el => {
  //     let valSrc: any = el.src;
  //     valSrc = valSrc.split("/");
  //     el.src = "";
  //     el.src = environment.EndPointAPI + '/img/post/' + valSrc[valSrc.length - 1];
  //   });
  //   return changeSrcImg.body.innerHTML;
  // }
}
