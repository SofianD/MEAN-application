import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  responseLogin: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.loginMail, form.value.loginPassword);
    this.responseLogin =  this.authService
                            .getResultConnect()
                            .subscribe(() => {
                              this.isLoading = false;
                            });
  }

  ngOnDestroy() {
    this.responseLogin.unsubscribe();
  }
}
