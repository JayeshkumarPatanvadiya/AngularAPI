import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subject-select',
  templateUrl: './subject-select.component.html',
  styleUrls: ['./subject-select.component.css'],
})
export class SubjectSelectComponent implements OnInit {
  @Input() favouriteSubjectInput?: any;
  @Input() Subchildinput?: any;
  @Input() subChildInputFav: any;
  @Input() Result: any;
  @Input() favSubject: boolean = true;
  @Input() selectSubject: boolean = true;

  @Output() SendToParent = new EventEmitter();
  @Output() SendToMainParents = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  //Used  @Output for send data to the parent component
  SendDataToParent(Result: any) {
    this.SendToParent.emit(Result);
  }

  //Used  @Output for send data to the parent component
  SendDataToMainParent(Result: any) {
    this.SendToMainParents.emit(Result);
  }
}
