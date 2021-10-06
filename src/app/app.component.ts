import { Component, OnInit } from '@angular/core';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { EmployeeDataServiceService } from './DataService/employee-data-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { update } from 'lodash';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private toastr: ToastsService,
    private employeeDataServiceService: EmployeeDataServiceService,
    private datePipe: DatePipe
  ) {}

  data: any;
  EmpForm!: FormGroup;
  submitted = false;
  EventValue: any = 'Save';

  ngOnInit() {
    this.getdata();

    this.EmpForm = new FormGroup({
      id: new FormControl(null),
      date: new FormControl('', [Validators.required]),
      distanceInMeters: new FormControl('', [Validators.required]),
      timeInSeconds: new FormControl('', [Validators.required]),
      insertDateTime: new FormControl('', [Validators.required]),
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
      this.Save();
    } else {
      alert('hello update' + this.EmpForm.value.id);
      this.Update();
    }
  }
  Save() {
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

    this.employeeDataServiceService.postData(parsed).subscribe((data) => {
      this.resetFrom();
    });
  }
  Update() {
    this.submitted = true;

    if (this.EmpForm.invalid) {
      return;
    }
    this.employeeDataServiceService
      .putData(this.EmpForm.value.id, this.EmpForm.value)
      .subscribe((data: any) => {
        this.data = data;
        this.resetFrom();
      });
  }
  EditData(Data: any) {
    this.EmpForm.controls['id'].setValue(Data.id);
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
