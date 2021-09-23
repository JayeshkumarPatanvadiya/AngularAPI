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
    dataservce1.get().subscribe((data: any) => (this.joggingData = data));
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
    // alert('update call' + this.editProfileForm.value.id);
    // if (this.editProfileForm.invalid) {
    //   return;
    // }
    this.dataservce1
      .putData(this.editProfileForm.value.id, this.editProfileForm.value)
      .subscribe((data: any) => {
        this.data = data;
        // this.resetFrom();
      });
    console.log('res:', this.editProfileForm.getRawValue());
  }

  public deleteRecord(record: any) {
    this.recordDeleted.emit(record);
  }

  getdata() {
    this.dataservce1.getData().subscribe((data: any) => {
      this.data = data;
    });
  }

  deleteData(id: any) {
    if (confirm('Are you sure to delete id number ' + id)) {
      this.dataservce1.deleteData(id).subscribe((data: any) => {
        this.data = data;
        this.getdata();
      });
    }
  }
  public newRecord() {
    this.newClicked.emit();
  }
}
