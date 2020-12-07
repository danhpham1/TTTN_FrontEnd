import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
LocalStorageService

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css']
})
export class ProductCommentComponent implements OnInit {
  @Input() comment;
  currentUser:string;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.getItemLocalStorage('userInfo').subscribe(user=>{
      if(user){
        this.currentUser = user['username'];
      }
    })
  }
}
