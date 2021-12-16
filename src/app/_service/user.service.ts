import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CustomEncoder } from './CustomEncoder';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  header: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    const headerSettings: { [name: string]: string | string[] } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  readonly BaseURI = 'https://localhost:44354/api/Accounts';

  headerSettings: { [name: string]: string | string[] } = {};

  formModel = this.fb.group({
    FirstName: ['', Validators.required],
    Email: ['', Validators.email],
    LastName: [''],
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
      FirstName: this.formModel.value.FirstName,
      Email: this.formModel.value.Email,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/register', body);
  }

  Login(model: any) {
    // debugger;
    var a = this.BaseURI + '/login';
    var body = {
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    };
    console.log(body);
    return this.http.post<any>(this.BaseURI + '/login', body, {
      headers: this.header,
    });
  }
  GetAllUsers() {
    return this.http.get<any>(this.BaseURI);
  }
  verifyEmail(token: any, email: any,) {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    console.log(token + email)     // not used 
    return this.http.post<any>(this.BaseURI + '/EmailConfirmation', token + email, {
      params: params,
      headers: this.header,
    });
  }

}
