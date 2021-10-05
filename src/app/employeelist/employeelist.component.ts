import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'distanceInMeters',
    'timeInSeconds',
    'action',
  ];
  //Table Data Source
  dataSource!: MatTableDataSource<any>;
  editProfileForm!: FormGroup;

  constructor(
    private DataServices: EmployeeDataServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  data: any;
  submitted = false;
  EventValue: any = 'Save';
  pageNumber: any;
  ngOnInit(): void {
    this.getsortData();
    this.editProfileForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      distanceInMeters: ['', Validators.required],
      timeInSeconds: ['', Validators.required],
      action: [''],
    });
  }
  getsortData() {
    this.DataServices.get().subscribe(
      (data) => {
        this.data = data;
        //Data Table Data Source and pagination with dynamic data

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.error(error)
    );
  }

  openModal(targetModal: any, i: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.editProfileForm.reset();
    if (i != null) {
      this.editProfileForm.patchValue({
        id: i.id,
        date: i.date,
        distanceInMeters: i.distanceInMeters,
        timeInSeconds: i.timeInSeconds,
      });
    }
  }

  onSubmit() {
    if (this.editProfileForm.value.id == null) {
      this.newRecord();
    } else {
      this.updateRecord();
    }
    this.getsortData();
  }

  deleteData(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.DataServices.deleteData(id).subscribe((data: any) => {
          this.data = data;
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        });
      }
    });
  }
  public newRecord() {
    this.submitted = true;

    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    } else {
      var string1 = JSON.stringify(this.editProfileForm.value);
      var parsed = JSON.parse(string1);
      delete parsed.id;
      this.DataServices.postData(parsed).subscribe((data: any) => {
        this.getsortData();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data Added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getsortData();
      });
    }
    this.editProfileForm.reset();
  }

  public updateRecord() {
    this.submitted = true;

    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();

      return;
    }

    this.DataServices.putData(
      this.editProfileForm.value.id,
      this.editProfileForm.value
    ).subscribe((data: any) => {
      this.data = data;
      this.getsortData();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your data updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    });
    console.log('res:', this.editProfileForm.getRawValue());
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
