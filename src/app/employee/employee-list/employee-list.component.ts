import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EmployeeListComponent implements OnInit {
  employeeList: any;
  dataSource: any;
  rowindex: any;
  editEmployeeData: any;
  columnsToDisplay = [
    'FirstName',
    'LastName',
    'DOB',
    'Email',
    'Phone',
    'Action',
  ];
  expandedElement: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    const jsondata = JSON.parse(localStorage.getItem('employeesList') || '{}');
    this.dataSource = jsondata;
    console.log(this.dataSource);
  }

  startEdit(id: any) {
    var getEmployeeData = this.dataSource[id];
    this.editEmployeeData = getEmployeeData;
    var employeeId = this.editEmployeeData.id;

    console.log(this.editEmployeeData);
    this.router.navigate(['employee/employeeForm/', employeeId]);
  }
  RemoveEmployee(rowindex: any, Phone: any) {
    console.log(this.dataSource);
    window.localStorage.removeItem('Phone');
    this.dataSource.splice(rowindex, 1);
    localStorage.setItem('employeesList', JSON.stringify(this.dataSource));
    console.log(this.dataSource);
    this.getEmployeeDetails();
  }
}
