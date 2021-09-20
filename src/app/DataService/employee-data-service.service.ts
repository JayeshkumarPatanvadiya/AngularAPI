import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/Models/Employee'
import { ROOT_URL } from 'src/app/Models/config'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataServiceService {
  //employees: Observable<Employee[]> | undefined;
  //newemployee: Employee | undefined;
  private headers: HttpHeaders;
  private accessPointUrl: string = 'https://localhost:44386/api/Workouts';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

}

  public get() {
    // Get all jogging data
    return this.http.get(this.accessPointUrl, { headers: this.headers });
  }

  public add(payload: any) {
    return this.http.post(this.accessPointUrl, payload, { headers: this.headers });
  }

//getEmployee() {
//  return this.http.get<Employee[]>(ROOT_URL + 'Workouts' + '/1');
//}
//AddEmployee(emp: Employee) {

//  const headers = new HttpHeaders().set('content-type', 'application/json');
//  var body = {
//    Id: emp.Id, Date: emp.Date, DistanceInMeters: emp.DistanceInMeters, TimeInSeconds: emp.TimeInSeconds
//  }
//  console.log(ROOT_URL);

//  return this.http.post<Employee>(ROOT_URL + '/Workouts', body, { headers });

//}
//  ///  
//  EditEmployee(emp: Employee) {
//    console.log(emp);
//    const params = new HttpParams().set('ID', emp.Id);
//    const headers = new HttpHeaders().set('content-type', 'application/json');
//    var body = {
//      Id: emp.Id, Date: emp.Date, DistanceInMeters: emp.DistanceInMeters, TimeInSeconds: emp.TimeInSeconds
     
//    }
//    return this.http.put<Employee>(ROOT_URL + 'Workouts/' + emp.Id, body, { headers, params })

//  }
//  DeleteEmployee(emp: Employee) {
//    const params = new HttpParams().set('ID', emp.Id);
//    const headers = new HttpHeaders().set('content-type', 'application/json');
//    var body = {
//      Id: emp.Id, Date: emp.Date, DistanceInMeters: emp.DistanceInMeters, TimeInSeconds: emp.TimeInSeconds
//    }
//    return this.http.delete<Employee>(ROOT_URL + '/Workouts/' + emp.Id)

//  }
}
