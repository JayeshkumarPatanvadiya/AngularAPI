import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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
    return this.http.get(this.accessPointUrl); //https://localhost:44352/ webapi host url
  }

  postData(formData: any) {
    return this.http.post(
      this.accessPointUrl,
      formData
    );
  }

  putData(id: any, formData: any) {
    return this.http.put(
      this.accessPointUrl + '/' + id,
      formData
    );
  }
  deleteData(id: any) {
    return this.http.delete(this.accessPointUrl + id);
  }
}
