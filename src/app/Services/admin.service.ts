import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  adminGetByIdUPL = 'http://localhost:3000/admin/';
  adminUpdateByIdUPL = 'http://localhost:3000/admin/';
  adminUpdatePasswordByIdUPL = 'http://localhost:3000/admin/';
 

  getAdminById(id: string): Observable<any> {
    const url = `${this.adminGetByIdUPL}${id}`;
    return this.http.get<any>(url);
  }

  updateAdminById(id: string, updatedData: any): Observable<any> {
    const url = `${this.adminUpdateByIdUPL}${id}`;
    return this.http.put<any>(url, updatedData);
  }

  updateAdminPhoto(doctorData: any, id: String): Observable<any>{
    console.log(doctorData)
    return this.http.put<any>(`${this.adminUpdateByIdUPL}${id}/photo`, doctorData);

  }
  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string): Observable<any> {
    const url = `${this.adminUpdatePasswordByIdUPL}${id}/changePassword`;
    const updatedData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    return this.http.put<any>(url, updatedData);
  }
}
