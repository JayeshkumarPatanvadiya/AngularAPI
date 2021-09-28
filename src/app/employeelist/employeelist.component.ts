import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { __asyncGenerator } from 'tslib';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Sort } from '@angular/material/sort';

export interface Dessert {
  id: number;
  date: string;
  distanceInMeters: number;
  timeInSeconds: string;
}
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  //Material table columns
  displayedColumns: string[] = [
    'id',
    'date',
    'distanceInMeters',
    'timeInSeconds',
    'action',
  ];
  //Table Data Source
  dataSource!: MatTableDataSource<any>;

  @Output() recordDeleted = new EventEmitter<any>();
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  public joggingData: any = [];
  public currentJogging: any;
  editProfileForm!: FormGroup;

  constructor(
    private dataservce1: EmployeeDataServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.getdata();
  }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  data: any;
  EmpForm!: FormGroup;
  submitted = false;
  EventValue: any = 'Save';
  pageNumber: any;
  ngOnInit(): void {
    //get request from web api and this web api is totaly free to use
    this.dataservce1.get().subscribe(
      (data) => {
        this.data = data;
        //Data Table Data Source and pagination with dynamic data
        this.getdata();
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.error(error)
    );

    this.getdata();

    this.editProfileForm = this.fb.group({
      id: [''],
      date: [''],
      distanceInMeters: [''],
      timeInSeconds: [''],
      action: [''],
    });
  }

  openModal(targetModal: any, i: any) {
    debugger;

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      id: i.id,
      date: i.date,
      distanceInMeters: i.distanceInMeters,
      timeInSeconds: i.timeInSeconds,
    });
  }

  onSubmit() {
    if (this.editProfileForm.value.id == null) {
      this.newRecord();
    } else {
      this.updateRecord();
      this.getdata();
    }
  }

  getdata() {
    this.dataservce1.get().subscribe((data: any) => (this.joggingData = data));
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
        this.dataservce1.deleteData(id).subscribe((data: any) => {
          this.data = data;

          this.getdata();
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  public newRecord() {
    this.submitted = true;

    if (this.editProfileForm.invalid) {
      alert('Invalid Form');
      return;
    }

    var string1 = JSON.stringify(this.editProfileForm.value);

    var parsed = JSON.parse(string1);
    delete parsed.id;
    this.dataservce1.postData(parsed).subscribe((data: any) => {
      this.getdata();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your data Added successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  public updateRecord() {
    this.dataservce1
      .putData(this.editProfileForm.value.id, this.editProfileForm.value)
      .subscribe((data: any) => {
        this.data = data;
        this.getdata();

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
}
