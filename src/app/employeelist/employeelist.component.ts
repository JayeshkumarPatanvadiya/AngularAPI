import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { __asyncGenerator } from 'tslib';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  @Output() recordDeleted = new EventEmitter<any>();
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  public joggingData: any;
  public currentJogging: any;
  editProfileForm!: FormGroup;

  constructor(
    private dataservce1: EmployeeDataServiceService,
    private route: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.getdata();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  data: any;
  EmpForm!: FormGroup;
  submitted = false;
  EventValue: any = 'Save';
  ngOnInit(): void {
    this.getdata();
    this.editProfileForm = this.fb.group({
      id: [''],
      date: [''],
      distanceInMeters: [''],
      timeInSeconds: [''],
      insertDateTime: [''],
    });
  }
  openModal(targetModal: any, i: any) {
    // alert(i.date);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      id: i.id,
      date: i.date,
      distanceInMeters: i.distanceInMeters,
      timeInSeconds: i.timeInSeconds,
      insertDateTime: i.insertDateTime,
    });
  }

  onSubmit() {
    if (this.editProfileForm.value.id == null) {
      this.newRecord();
    } else {
      this.dataservce1
        .putData(this.editProfileForm.value.id, this.editProfileForm.value)
        .subscribe((data: any) => {
          this.data = data;
          // this.resetFrom();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      console.log('res:', this.editProfileForm.getRawValue());
    }
  }

  public deleteRecord(record: any) {
    this.recordDeleted.emit(record);
  }

  getdata() {
    this.dataservce1.get().subscribe((data: any) => (this.joggingData = data));
  }

  deleteData(id: any) {
    // if (confirm('Are you sure to delete id number ' + id)) {
    //   this.dataservce1.deleteData(id).subscribe((data: any) => {
    //     this.data = data;

    //     this.getdata();
    //   });
    // }

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

    if (this.EmpForm.invalid) {
      alert('Invalid Form');
      return;
    }

    var string1 = JSON.stringify(this.EmpForm.value);
    var parsed = JSON.parse(string1);
    delete parsed.id;
    alert(
      'hello save' +
        parsed['distanceInMeters'] +
        parsed['timeInSeconds'] +
        parsed['date'] +
        parsed['id'] +
        parsed['insertDateTime']
    );

    this.dataservce1.postData(parsed).subscribe((data: any) => {
      //  this.resetFrom();
    });
  }
}
