import { LocalStorageService } from './../../core/services/local-storage.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isUsernameValid: boolean = true;
  isPasswordValid: boolean = true;
  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  loginUser(data) {
    this.isPasswordValid = true;
    this.isUsernameValid = true;

    if (data.value.username == "") {
      this.isUsernameValid = false;
    }
    if (data.value.password == "") {
      this.isPasswordValid = false;
    }

    if (this.isPasswordValid && this.isUsernameValid) {
      this.authService.loginUser(data.value).subscribe(rs => {
        // console.log(rs['user']);
        this.localStorageService.setItemLocalStorage('userInfo', rs['user']).subscribe(() => { })
        this.router.navigateByUrl('/home');
      })
    }
  }
}
