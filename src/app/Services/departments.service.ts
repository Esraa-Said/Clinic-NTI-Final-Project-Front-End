import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  departmentsGetURL = 'http://localhost:3000/department';
  departmentsCreateURL = 'http://localhost:3000/department';

  getDepartments() {
    return this.http.get<any>(this.departmentsGetURL);
  }

  addDepartment(department: any){
    return this.http.post<any>(this.departmentsCreateURL, department);

  }
}
