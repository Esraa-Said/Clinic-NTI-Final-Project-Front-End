import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  patientGetByIdUPL = 'http://localhost:3000/patient/';
  patientUpdateByIdUPL = 'http://localhost:3000/patient/';
  patientUpdatePasswordByIdUPL = 'http://localhost:3000/patient/';
  patientsGetUPL = 'http://localhost:3000/patient';
  patientDeleteByIdUPL = 'http://localhost:3000/patient/';
  patientGetCountsUPL = 'http://localhost:3000/patient/count';



  constructor(private http: HttpClient) {}

  getPatientById(id: String): Observable<any> {
    const url = `${this.patientGetByIdUPL}${id}`;
    return this.http.get<any>(url);
  }
  updatePatientById(id: string, updatedData: any): Observable<any> {
    const url = `${this.patientUpdateByIdUPL}${id}`;
    return this.http.put<any>(url, updatedData);
  }

  updatePatientPhoto(doctorData: any, id: String): Observable<any>{
    return this.http.put<any>(`${this.patientUpdateByIdUPL}${id}/photo`, doctorData);

  }

  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.patientUpdatePasswordByIdUPL}${id}/changePassword`;
    const updatedData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    return this.http.put<any>(url, updatedData);
  }

  getPatients(): Observable<any> {
    return this.http.get<any>(this.patientsGetUPL);
  }

  updatePatientWithAppointments(string: any, value: any): Observable<any> {
    return this.http.put<any>(this.patientGetByIdUPL, value);
  }

  deletePatient(id: string): Observable<any> {
    const url = `${this.patientDeleteByIdUPL}${id}`;
    return this.http.delete<any>(url);
  }

  getPatientsCounts(): Observable<any> {
    return this.http.get<any>(this.patientGetCountsUPL);
  }
  
}
