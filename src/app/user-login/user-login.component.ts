import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  model: any = {};

  errorMessage!: string;
  constructor(
    private router: Router,
    public service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  login() {
    this.service.Login(this.model).subscribe(
      (res) => {
        console.log(res);
        if (res.token != null) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/crud-operation']);
        } else {
          this.toastr.warning('Username or paasword incorrect!');
          this.errorMessage = res.Message;
        }
      },
      (error) => {
        this.toastr.warning('something went wrong!!');

        this.errorMessage = error.message;
      }
    );
  }
}
