import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'firstName',
    'lastName',
    'email',
  ];
  data: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(public userService: UserService) { }


  ngOnInit(): void {
    this.getsortData();
  }


  getsortData() {
    this.userService.GetAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        //Data Table Data Source and pagination with dynamic data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.error(error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
