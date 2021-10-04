import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SubjectFavouriteComponent } from './subject-favourite/subject-favourite.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { SubjectFavouriteChildComponent } from './subject-favourite-child/subject-favourite-child.component';
import { SubjectSelectComponent } from './subject-select/subject-select.component';
import { BootstrapMenuComponent } from './bootstrap-menu/bootstrap-menu.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'CRUDOperation',
    component: EmployeelistComponent,
  },
  {
    path: 'InputAndOutput',
    component: SubjectFavouriteComponent,
  },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatChipsModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
  providers: [EmployeeDataServiceService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
