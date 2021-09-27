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
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // MatPaginator Inputs
  length = 1;
  pageSize = 1;
  pageSizeOptions: number[] = [1, 2, 3, 4];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  @Output() recordDeleted = new EventEmitter<any>();
  @Output() newClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  public joggingData: any = [];
  public currentJogging: any;
  editProfileForm!: FormGroup;
  badgeCounter!: number;

  constructor(
    private dataservce1: EmployeeDataServiceService,
    private route: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.getdata();
    this.badgeCounter = 0;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  data: any;
  EmpForm!: FormGroup;
  submitted = false;
  EventValue: any = 'Save';
  pageNumber: any;
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
      this.updateRecord();
    }
  }

  public deleteRecord(record: any) {
    this.recordDeleted.emit(record);
  }

  getdata() {
    this.badgeCounter = 10;

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
