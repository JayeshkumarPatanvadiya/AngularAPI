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
      // 'Cache-Control': 'no-cache',
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

  getData() {
    return this.http.get('https://localhost:44386/api/Workouts'); //https://localhost:44352/ webapi host url
  }

  postData(formData: any) {
    return this.http.post('https://localhost:44386/api/Workouts', formData);
  }

  putData(id: any, formData: any) {
    return this.http.put(
      'https://localhost:44386/api/Workouts/' + id,
      formData
    );
  }
  deleteData(id: any) {
    return this.http.delete('https://localhost:44386/api/Workouts/' + id);
  }
}
