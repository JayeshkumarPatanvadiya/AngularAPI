import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: any;
  dataSource: any = [];
  constructor() {}

  ngOnInit(): void {
    const jsondata = JSON.parse(localStorage.getItem('employeesList') || '{}');

    this.employeeList = JSON.parse(jsondata);
    console.log('Employee List', this.employeeList);

    // this.dataSource = jsondata;
    // this.employeeList = jsondata;
  }
}
