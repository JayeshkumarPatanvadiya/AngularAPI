import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/Models/Employee';
import { ROOT_URL } from 'src/app/Models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataServiceService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'https://localhost:44386/api/Workouts';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  public get() {
    // Get all jogging data
    return this.http.get(this.accessPointUrl, { headers: this.headers });
  }

  public add(payload: any) {
    return this.http.post(this.accessPointUrl, payload, {
      headers: this.headers,
    });
  }
  public remove(payload: any) {
    return this.http.delete(this.accessPointUrl + '/' + payload.Id, {
      headers: this.headers,
    });
  }

  public update(payload: any) {
    return this.http.put(this.accessPointUrl + '/' + payload.Id, payload, {
      headers: this.headers,
    });
  }
}
