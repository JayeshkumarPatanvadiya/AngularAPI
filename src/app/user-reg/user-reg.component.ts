import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css'],
})
export class UserRegComponent implements OnInit {
  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    if (this.service.formModel.valid) {
      this.service.register().subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.service.formModel.reset();
            this.toastr.success(
              'New user created!',
              'Registration successful.'
            );
          }
        },
        (error) => {
          console.log(error);
          // iterate over each key in the key / value pair.
          if (error.status === 200) {
            for (var key in error.error) {
              // iterate over each element in the data[key] array of validation messages
              this.service.formModel.reset();
              this.toastr.success(
                'New user created!',
                'please check your mailbox for confirm email id.'
              );
            }
          }
          if (error.status === 400) {
            for (var key in error.error) {
              // iterate over each element in the data[key] array of validation messages
              this.toastr.error(
                error.error[key],
                'Registration failed.'
              );
            }
          }


        }
      );
    } else {
      this.service.formModel.markAllAsTouched();
    }
  }
}
