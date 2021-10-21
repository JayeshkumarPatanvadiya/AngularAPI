import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css'],
})
export class UserRegComponent implements OnInit {
  constructor(public service: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    if (this.service.formModel.valid) {
      this.service.register().subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 'Success') {
            this.service.formModel.reset();
            this.toastr.success(
              'New user created!',
              'Registration successful.'
            );
          } else {
            res.errors.forEach((element: any) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error(
                    'Username is already taken',
                    'Registration failed.'
                  );
                  break;

                default:
                  this.toastr.error(
                    element.description,
                    'Registration failed.'
                  );
                  break;
              }
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.service.formModel.markAllAsTouched();
    }
  }
}
