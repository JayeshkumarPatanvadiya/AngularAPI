import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.css']
})
export class EmailconfirmationComponent implements OnInit {
  public showSuccess: boolean | undefined;
  public showError: boolean | undefined;
  public errorMessage: string | undefined;
  userEmail: any;
  durationInSeconds = 5;
  constructor(private router: Router,
    private _route: ActivatedRoute,
    public _authService: UserService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.confirmEmail();

  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    this.userEmail = email;
    this._authService.verifyEmail(token, email)
      .subscribe(_ => {
        this.showSuccess = true;
        this.openSnackBarSuccess();
      },
        error => {
          this.openSnackBar();
          this.showError = true;
          this.errorMessage = error;
        })
  }


  openSnackBar() {
    this._snackBar.open("Email Verification Failed", "dismiss", {
      duration: this.durationInSeconds * 1000,
    });
  }

  openSnackBarSuccess() {
    this._snackBar.open("Email Verification successfully", "dismiss", {
      duration: this.durationInSeconds * 1000,
    });
  }

}
