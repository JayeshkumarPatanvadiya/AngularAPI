import { Component, OnInit } from '@angular/core';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { EmployeeDataServiceService } from './DataService/employee-data-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { update } from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // currentJogging: {
  //   id: undefined;
  //   date: string;
  //   distanceInMeters: string;
  //   timeInSeconds: string;
  // };
  constructor(
    private toastr: ToastsService,
    private employeeDataServiceService: EmployeeDataServiceService,
    private datePipe: DatePipe
  ) {
    // this.currentJogging = this.setInitialValuesForJoggingData();
  }

  data: any;
  EmpForm!: FormGroup;
  submitted = false;
  EventValue: any = 'Save';

  // private setInitialValuesForJoggingData() {
  //   return {
  //     id: undefined,
  //     date: '',
  //     distanceInMeters: '',
  //     timeInSeconds: '',
  //   };
  // }
  ngOnInit() {
    this.getdata();

    this.EmpForm = new FormGroup({
      id: new FormControl(null),
      date: new FormControl(''),
      distanceInMeters: new FormControl(''),
      timeInSeconds: new FormControl(''),
      insertDateTime: new FormControl(''),
    });
  }

  showToaster() {
    this.toastr.success('Your Data Saved SuccessFully!!!!.');
  }

  showToastereEdit() {
    this.toastr.success('Your Data Updated SuccessFully!!!!.');
  }

  getdata() {
    this.employeeDataServiceService.getData().subscribe((data: any) => {
      this.data = data;
    });
  }

  deleteData(id: any) {
    if (confirm('Are you sure to delete id number ' + id)) {
      this.employeeDataServiceService.deleteData(id).subscribe((data: any) => {
        this.data = data;
        this.getdata();
      });
    }
  }

  createOrUpdateJogging() {
    if (this.EmpForm.value.id == null) {
      this.submitted = true;
      // if (this.EmpForm.invalid) {
      //   return;
      // }
      this.employeeDataServiceService
        .postData(this.EmpForm.value)
        .subscribe((data) => {
          alert(data);
          this.data = data;
          this.resetFrom();
        });
      // this.employeeDataServiceService
      //   .postData(this.EmpForm.value)
      //   .subscribe((data: any) => {
      //     this.data = data;
      //     this.resetFrom();
      //   });
      //  this.showToaster();
    } else {
      alert('hello update');
      this.submitted = true;
      if (this.EmpForm.invalid) {
        return;
      }
      this.employeeDataServiceService
        .putData(this.EmpForm.value.id, this.EmpForm.value)
        .subscribe((data: any) => {
          alert(data);
          this.data = data;
          this.showToastereEdit();
          this.resetFrom();
        });
    }
  }

  EditData(Data: any) {
    this.EmpForm.controls['id'].setValue(Data.id);
    // datePipe.transform(Data.date(), 'yyyy-MM-dd');
    this.EmpForm.controls['date'].setValue(
      this.datePipe.transform(Data.date, 'MM-dd-yyyy')
    );
    this.EmpForm.controls['distanceInMeters'].setValue(Data.distanceInMeters);
    this.EmpForm.controls['timeInSeconds'].setValue(Data.timeInSeconds);
    this.EmpForm.controls['insertDateTime'].setValue(Data.insertDateTime);
    this.EventValue = 'Update';
  }

  resetFrom() {
    this.getdata();
    this.EmpForm.reset();
    this.EventValue = 'Save';
    this.submitted = false;
  }
}
