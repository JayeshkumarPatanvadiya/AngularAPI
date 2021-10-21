import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  header: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    const headerSettings: { [name: string]: string | string[] } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  readonly BaseURI = 'https://localhost:44386/api/Authenticate';

  headerSettings: { [name: string]: string | string[] } = {};

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      }
      //   { validator: this.comparePasswords }
    ),
  });

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/register', body);
  }

  Login(model: any) {
    // debugger;
    console.log(model);
    var a = this.BaseURI + '/login';
    var body = {
      UserName: this.formModel.value.UserName,
      Password: this.formModel.value.Passwords.Password,
    };
    console.log(body);
    return this.http.post<any>(this.BaseURI + '/login', body, {
      headers: this.header,
    });
  }
}
