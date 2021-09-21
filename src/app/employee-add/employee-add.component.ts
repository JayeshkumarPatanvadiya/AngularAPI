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
import { ToastrService as ToastsService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})



  
export class EmployeeAddComponent implements OnInit {
  @Output() joggingCreated = new EventEmitter<any>();
  @Input() joggingInfo: any;
  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();

  @ViewChild('closeBtn') cb?: ElementRef;
  public buttonText = 'Save';

  constructor(
    private dataservice: EmployeeDataServiceService,
    private route: Router,
    private toastr: ToastsService
  ) {
    this.clearJoggingInfo();
    console.log(this.joggingInfo.date);
  }
  ngOnInit() {}
  private clearJoggingInfo = () => {
    // Create an empty jogging object
    this.joggingInfo = {
      id: undefined,
      date: '',
      distanceInMeters: 0,
      timeInSeconds: 0,
    };
  };

  public addOrUpdateJoggingRecord = (event: any) => {
    this.joggingCreated.emit(this.joggingInfo);
    this.clearJoggingInfo();
    this.showToaster();
  };

  showToaster() {
    this.toastr.success('Your Data Saved SuccessFully!!!!.');
  }
}
