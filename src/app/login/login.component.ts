import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { GoogleAuthDetailsService } from '../_service/google-auth-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  username!: string;
  password!: string;
  socialUser!: SocialUser;
  isLoggedin!: boolean;

  googleDetails!: BehaviorSubject<any>;
  constructor(
    private _auth: AuthenticationService,
    private fb: FormBuilder,
    private _router: Router,
    private socialAuthService: SocialAuthService,
    private googleAuthDetailsService: GoogleAuthDetailsService
  ) {
    if (this._auth.loggedIn) {
      this._router.navigate(['crud-operation']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.googleDetails = new BehaviorSubject(this.socialUser);
      this.nextCount();
      localStorage.setItem('currentUser', 'loggedin');

      if (!this.socialUser) {
        this._router.navigate(['login']);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully!!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this._router.navigate(['crud-operation']);
        });
      }
    });
  }
  nextCount() {
    this.googleAuthDetailsService.socialAuthDetails.next(this.socialUser);
  }

  login(): void {
    this.submitted = true;

    if (this.username != '' && this.password != '') {
      if (
        this._auth.login(
          this.loginForm.controls['username'].value,
          this.loginForm.controls['password'].value
        )
      ) {
        this._router.navigate(['crud-operation']);
      } else
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'UserName or Password is Incorrect!!',
          showConfirmButton: false,
          timer: 1500,
        });
      // this._router.navigate(['crud-operation']);
    }
  }

  loginWithGoogle(): void {
    this.submitted = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.nextCount();
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }
}
