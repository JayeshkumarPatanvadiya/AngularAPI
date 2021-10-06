import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthDetailsService {
  socialAuthDetails!: BehaviorSubject<any>;
  constructor() {
    this.socialAuthDetails = new BehaviorSubject('');
  }
}
