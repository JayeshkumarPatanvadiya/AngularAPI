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
  @Input() favSubject?: boolean;
  @Input() selectSubject?: boolean;

  @Output() sendSelectToSubParent = new EventEmitter();
  @Output() sendFavToSubParent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  //Used  @Output for send data to the parent component
  sendSelectDataToSubParent(Result: any) {
    this.sendSelectToSubParent.emit(Result);
  }

  //Used  @Output for send data to the parent component
  sendFavDataToMainParent(Result: any) {
    this.sendFavToSubParent.emit(Result);
  }
}
