import { result } from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject-favourite-child',
  templateUrl: './subject-favourite-child.component.html',
  styleUrls: ['./subject-favourite-child.component.css'],
})
export class SubjectFavouriteChildComponent implements OnInit {
  @Input() myinputMsg?: any;
  @Input() favouriteSubjectInput?: any;

  Subchild?: any = this.myinputMsg;
  subchildFav?: any = this.favouriteSubjectInput;

  favSubject: boolean = true;
  selectSubject: boolean = true;
  @Output() SendToParent = new EventEmitter();
  @Output() SendToMainParents = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    let Subchild: Array<any>;
    this.Subchild = this.myinputMsg;
  }

  //Used  @Output for send data to the parent component
  // SendDataToParent(Result: any) {
  //   this.SendToParent.emit(Result);
  //   console.log(Result);
  // }

  //Used  @Output for send data to the parent component
  // SendDataToMainParent(Result: any) {
  //   this.SendToMainParents.emit(Result);
  // }

  sendSelectDataToMainParent(Result: any) {
   
    this.SendToParent.emit(Result);
  }

  sendFavDataToMainParent(Result: any) {
    
    this.SendToMainParents.emit(Result);
  }
}
