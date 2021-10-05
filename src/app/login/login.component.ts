import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

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
  title = 'auth-guard-demo';
  constructor(
    private _auth: AuthenticationService,
    private fb: FormBuilder,
    private _router: Router,
    private socialAuthService: SocialAuthService
  ) {
    if (this._auth.loggedIn) {
      this._router.navigate(['crudOperation']);
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
       console.log(this.socialUser.email);
       console.log(this.socialUser.photoUrl);
    });
   
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
        this._router.navigate(['crudOperation']);
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'warning',
        //   title: 'UserName or Password is Correct!!' + this.socialUser,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'UserName or Password is Incorrect!!',
          showConfirmButton: false,
          timer: 1500,
        });
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    if (!this.socialAuthService.signIn) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'UserName or Password is Correct!!' + this.socialUser.email,
        showConfirmButton: false,
        timer: 1500,
      });
      this._router.navigate(['crudOperation']);
    }
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  get registerFormControl() {
    return this.loginForm.controls;
  }
  get username1() {
    return this.loginForm.value;
  }
}
