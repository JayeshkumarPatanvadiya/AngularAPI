import { Component, OnInit, Input } from '@angular/core';
import { result } from 'lodash';

@Component({
  selector: 'app-subject-favourite',
  templateUrl: './subject-favourite.component.html',
  styleUrls: ['./subject-favourite.component.css'],
})
export class SubjectFavouriteComponent implements OnInit {
  currentRate = 8;
  Subject: string = 'Laravel';
  id = 0;

  myObjArray = [
    { id: 1, currentRate: 1, Subject: 'Angular' },
    { id: 2, currentRate: 2, Subject: 'Bootstrap' },
    { id: 3, currentRate: 3, Subject: '.Net Core' },
    { id: 4, currentRate: 4, Subject: 'Asp.Net' },
    { id: 5, currentRate: 5, Subject: 'HTML' },
    { id: 6, currentRate: 6, Subject: 'MongoDB' },
    { id: 7, currentRate: 7, Subject: 'SQL' },
  ];

  //  @Input()  Decorator In Angular , send Array to child component
  myInputMessage: any = this.myObjArray;

  FavouriteSubjectArray = [
    { id: '8', currentRate: this.currentRate, Subject: 'Laravel' },
  ];

  //  @Input()  Decorator In Angular , send Array to child component
  FavouriteSubjectInput: any = this.FavouriteSubjectArray;

  addNew(Result: any) {
    this.FavouriteSubjectArray.push({
      currentRate: Result.currentRate,
      Subject: Result.Subject,
      id: Result.id,
    });
    let i = Result.id;
    let index = this.myObjArray.findIndex((x: any) => x.id == i);
    this.myObjArray.splice(index, 1);
  }

  RemoveFavorite(Result: any) {
    this.myObjArray.push({
      currentRate: Result.currentRate,
      Subject: Result.Subject,
      id: Result.id,
    });
    let i = Result.id;
    let index = this.FavouriteSubjectArray.findIndex((y: any) => y.id == i);
    this.FavouriteSubjectArray.splice(index, 1);
  }

  constructor() {}

  ngOnInit(): void {}
}
