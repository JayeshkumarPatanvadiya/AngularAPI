import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeDataServiceService } from '../DataService/employee-data-service.service';
import { Employee } from 'src/app/Models/Employee';
import { Router } from '@angular/router';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { MatSliderModule } from '@angular/material/slider';
import { __asyncGenerator } from 'tslib';
import * as _ from 'lodash';

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

  constructor(
    private dataservce1: EmployeeDataServiceService,
    private route: Router
  ) {
    dataservce1.get().subscribe((data: any) => (this.joggingData = data));
    this.currentJogging = this.setInitialValuesForJoggingData();
  }

  ngOnInit(): void {}
  private setInitialValuesForJoggingData() {
    return {
      id: undefined,
      date: '',
      distanceInMeters: 0,
      timeInSeconds: 0,
    };
  }
  public deleteRecord(record: any) {
    this.recordDeleted.emit(record);
  }

  public editRecord(record: any) {
    const clonedRecord = Object.assign({}, record);
    this.editClicked.emit(clonedRecord);
  }

  public newRecord() {
    this.newClicked.emit();
  }
  public createOrUpdateJogging = (jogging: any) => {
    // if jogging is present in joggingData, we can assume this is an update
    // otherwise it is adding a new element
    let joggingWithId;
    joggingWithId = _.find(
      this.joggingData,
      (el: { id: any }) => el.id === jogging.id
    );

    if (joggingWithId) {
      const updateIndex = _.findIndex(this.joggingData, {
        id: joggingWithId.id,
      });
      this.dataservce1
        .update(jogging)
        .subscribe((joggingRecord: any) =>
          this.joggingData.splice(updateIndex, 1, jogging)
        );
    } else {
      this.dataservce1
        .add(jogging)
        .subscribe((joggingRecord: any) => this.joggingData.push(jogging));
    }

    this.currentJogging = this.setInitialValuesForJoggingData();
  };
}
