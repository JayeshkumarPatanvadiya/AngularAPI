import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';
/*D: \AngularAPI\src\app\DataService\employee - data - service.service.ts*/
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  constructor(private dataservice: EmployeeDataServiceService, private route: Router) { }
  @Output() nameEvent = new EventEmitter<string>();
  @ViewChild('closeBtn') cb?: ElementRef;
  ngOnInit() {
  }
  @Input() reset: boolean = false;
  @ViewChild('regForm') myForm: NgForm | undefined;
  @Input() isReset: boolean = false;
  objtempemp?: Employee;
  @Input() objemp: Employee = new Employee();
  EditEmployee(regForm: NgForm) {
    //this.dataservice.EditEmployee(this.objemp).subscribe(res => {
    //  alert("Employee updated successfully");
    //  this.nameEvent.emit("ccc");
    //  this.cb.nativeElement.click();

    //},  
  };

 

}
