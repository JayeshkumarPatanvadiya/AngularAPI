import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeDataServiceService } from './DataService/employee-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SubjectFavouriteComponent } from './subject-favourite/subject-favourite.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { SubjectFavouriteChildComponent } from './subject-favourite-child/subject-favourite-child.component';
import { SubjectSelectComponent } from './subject-select/subject-select.component';
import { BootstrapMenuComponent } from './bootstrap-menu/bootstrap-menu.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { AuthenticationService } from './_service/authentication.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HighlightDirective } from './custom-directory/app-highlight.directive';
import { environment } from './../environments/environment';
import { UserRegComponent } from './user-reg/user-reg.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MatTableModule } from '@angular/material/table';
import { EmailconfirmationComponent } from './emailconfirmation/emailconfirmation.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'crud-operation',
    component: EmployeelistComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: 'user-reg',
    component: UserRegComponent,
    data: {
      title: 'user-reg',
    },
  },
  {
    path: 'user-login',
    component: UserLoginComponent,
    data: {
      title: 'user-login',
    },
  },
  {
    path: 'fav-unfav-subject',
    component: SubjectFavouriteComponent,
  },
  {
    path: 'emailconfirmation',
    component: EmailconfirmationComponent,
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },

  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },



  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    SubjectFavouriteComponent,
    SubjectFavouriteChildComponent,
    SubjectSelectComponent,
    BootstrapMenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    HighlightDirective,
    UserRegComponent,
    UserLoginComponent,
    EmailconfirmationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    MaterialModule,
    NgxSpinnerModule,
    CommonModule,
    MatTableModule,
    MatSnackBarModule
  ],
  exports: [RouterModule],
  providers: [
    EmployeeDataServiceService,
    DatePipe,
    AuthenticationService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '419048329868-97svpg22s3b8vv6e79sle2uo4tdm62gb.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
