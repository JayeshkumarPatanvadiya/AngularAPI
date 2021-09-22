import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularCrudComponent } from './angular-crud/angular-crud.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeDataServiceService } from './DataService/employee-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import * as _ from 'lodash';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AngularCrudComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    EmployeelistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    // MatInputModule,
    // BrowserAnimationsModule,
  ],
  exports: [
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    // MatInputModule,
    // BrowserAnimationsModule,
  ],
  providers: [EmployeeDataServiceService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
