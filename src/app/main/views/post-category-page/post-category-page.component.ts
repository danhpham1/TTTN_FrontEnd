import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-category-page',
  templateUrl: './post-category-page.component.html',
  styleUrls: ['./post-category-page.component.css']
})
export class PostCategoryPageComponent implements OnInit {
  postList$: Observable<any>;
  environment = environment
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postList$ = this.postService.getAllPost();
    let nav = document.querySelector('.wide-nav-mobi');
    nav.classList.remove('nav-show');
    nav.classList.add('nav-hide');
  }

}
