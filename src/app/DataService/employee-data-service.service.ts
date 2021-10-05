import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataServiceService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost/AngularAPIs/api/Workouts';
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

  public add(formData: any) {
    return this.http.post<any>(this.accessPointUrl, formData, {
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
    return this.http.get('http://localhost/AngularAPIs/api/Workouts'); //https://localhost:44352/ webapi host url
  }

  postData(formData: any) {
    return this.http.post(
      'http://localhost/AngularAPIs/api/Workouts',
      formData
    );
  }

  putData(id: any, formData: any) {
    return this.http.put(
      'http://localhost/AngularAPIs/api/Workouts/' + id,
      formData
    );
  }
  deleteData(id: any) {
    return this.http.delete('http://localhost/AngularAPIs/api/Workouts/' + id);
  }
}
