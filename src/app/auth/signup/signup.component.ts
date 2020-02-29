import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  isSignedUp: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      console.log('Error form', form.value);
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.signupMail, form.value.signupPassword);
    this.isSignedUp = this.authService
                        .getResultConnect()
                        .subscribe(() => {
                          this.isLoading = false;
                        });
  }

  ngOnDestroy() {
    this.isSignedUp.unsubscribe();
  }
}
