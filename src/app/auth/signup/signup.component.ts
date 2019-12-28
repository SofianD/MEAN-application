import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      console.log('Error form', form.value);
      return;
    }
    this.authService.createUser(form.value.signupMail, form.value.signupPassword);
  }
}
