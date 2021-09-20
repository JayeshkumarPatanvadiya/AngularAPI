import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service'
import { Employee } from 'src/app/Models/Employee'
import { Router } from '@angular/router';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})

export class EmployeelistComponent implements OnInit {

  public joggingData: any;
  public currentJogging: any;
  emplist?: Employee[];
  dataavailbale: Boolean = true;
  tempemp: Employee | undefined;

  constructor(private dataservce1: EmployeeDataServiceService, private route: Router) {
    dataservce1.get().subscribe((data: any) => this.joggingData = data);
}

  ngOnInit(): void {
   /* this.LoadData();*/
  }
  //LoadData() {
  //  this.dataservce.getEmployee().subscribe((tempdate) => {
  //    this.emplist = tempdate;
  //    console.log(this.emplist);
  //    if (this.emplist.length > 0) {
  //      this.dataavailbale = true;
  //    }
  //    else {
  //      this.dataavailbale = false;
  //    }
  //  }
  //  )
  //    , (err: any) => {
  //      console.log(err);
  //    }
  //}
  //deleteconfirmation(id: string) {

  //  if (confirm("Are you sure you want to delete this ?")) {
  //    this.tempemp = new Employee();
  //    this.tempemp.Id = id;
  //    this.dataservce.DeleteEmployee(this.tempemp).subscribe(res => {
  //      alert("Deleted successfully !!!");
  //      this.LoadData();
  //    })
  //  }
  //}
  @ViewChild('empadd')
    addcomponent!: EmployeeAddComponent; 
  @ViewChild('regForm') editcomponent!: EmployeeUpdateComponent
  loadAddnew() {
    this.addcomponent.objemp.Id = ""
    this.addcomponent.objemp.Date = ""
    this.addcomponent.objemp.DistanceInMeters = ""
   /* this.addcomponent.objemp.TimeInSeconds = */
    /*this.addcomponent.objemp.gender = 0*/
  }
  loadnewForm(id: string, email: string, firstname: string, lastname: string, gender: number) {
    console.log(gender);
    this.editcomponent.objemp.email = email
    this.editcomponent.objemp.firstname = firstname
    this.editcomponent.objemp.lastname = lastname
    this.editcomponent.objemp.Id = id
    this.editcomponent.objemp.gender = gender
  }
  RefreshData() {
   /* this.LoadData();*/
  }

}
