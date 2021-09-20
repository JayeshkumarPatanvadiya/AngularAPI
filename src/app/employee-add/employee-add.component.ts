// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-employee-add',
//   templateUrl: './employee-add.component.html',
//   styleUrls: ['./employee-add.component.css']
// })
// export class EmployeeAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Router } from '@angular/router';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';



@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})



export class EmployeeAddComponent implements OnInit {
  @Output() joggingCreated = new EventEmitter<any>();
  @Input() joggingInfo: any;
  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  objtempemp: Employee | undefined;
  @Input() objemp: Employee = new Employee();
  @ViewChild('closeBtn') cb?: ElementRef;
  public buttonText = 'Save';
  constructor(

    private dataservice: EmployeeDataServiceService,
    private route: Router
  ) {}
  ngOnInit() {}
  Register(regForm: NgForm) {
    this.objtempemp = new Employee();
    this.objtempemp.Id = regForm.value.email;
    this.objtempemp.Date = regForm.value.firstname;
    this.objtempemp.DistanceInMeters = regForm.value.lastname;
    this.objtempemp.TimeInSeconds = regForm.value.gender;

    this.dataservice.add(this.objtempemp).subscribe((res) => {
      alert('Employee Added successfully');
    //  this.TakeHome();
    });
  }
//  TakeHome() {
//    this.nameEvent.emit('ccc');
//    this.cb.nativeElement.click();
//    this.route.navigateByUrl('');
//  }
}
