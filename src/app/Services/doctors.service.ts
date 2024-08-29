import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http: HttpClient) { }

  doctorsGetURL = 'http://localhost:3000/doctor';
  doctorCreateURL = 'http://localhost:3000/doctor';
  doctorGetByIdUPL = 'http://localhost:3000/doctor/';
  doctorGetByNameUPL = 'http://localhost:3000/doctor/name/';
  doctorDeleteByIdUPL = 'http://localhost:3000/doctor/';
  doctorUpdateByIdUPL = 'http://localhost:3000/doctor/';
  doctorUpdatePasswordByIdUPL = 'http://localhost:3000/doctor/';
  doctorAddFreeSlotByIdUPL = 'http://localhost:3000/doctor/';
  doctorRemoveFreeSlotUPL = 'http://localhost:3000/doctor/';
  doctorGetFreeSlotByDateUPL = 'http://localhost:3000/doctor/';
  doctorGetCountsUPL = 'http://localhost:3000/doctor/count';


  getDoctors(): Observable<any>{
    return this.http.get<any>(this.doctorsGetURL)
  }
  

  getDoctorById(id: String): Observable<any> {
    const url = `${this.doctorGetByIdUPL}${id}`;
    return this.http.get<any>(url);
  }

  getDoctorByName(name: string) {
    const url = `${this.doctorGetByNameUPL}${name}`;
    return this.http.get<any>(url);
  }

  addDoctor(doctorData: any): Observable<any>{
    console.log(doctorData)
    return this.http.post<any>(this.doctorCreateURL, doctorData);

  }
  updateDoctorPhoto(doctorData: any, id: String): Observable<any>{
    return this.http.put<any>(`${this.doctorUpdateByIdUPL}${id}/photo`, doctorData);

  }

  deleteDoctor(id: string): Observable<any> {
    const url = `${this.doctorDeleteByIdUPL}${id}`;
    return this.http.delete<any>(url);
  }


  updateDoctorById(id: string, updatedData: any): Observable<any> {
    const url = `${this.doctorUpdateByIdUPL}${id}`;
    return this.http.put<any>(url, updatedData);
  }

  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.doctorUpdatePasswordByIdUPL}${id}/changePassword`;
    const updatedData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    return this.http.put<any>(url, updatedData);
  }

  addFreeSlots(id: string, freeSlots: any[]): Observable<any>{
    console.log(freeSlots)
    const url = `${this.doctorAddFreeSlotByIdUPL}${id}/freeSlot`;
    return this.http.post<any>(url, freeSlots);
  }

  removeFreeSlot(id: string, freeSlotId: string): Observable<any> {
    const url = `${this.doctorRemoveFreeSlotUPL}${id}/freeSlot/${freeSlotId}`;
    return this.http.delete<any>(url);
  }

  getFreeSlotsOfDay(id: string, date: string): Observable<any> {
    const url = `${this.doctorGetFreeSlotByDateUPL}${id}/slots/${date}`;
    return this.http.get<any>(url);
  }
  
  getDoctorsCounts(): Observable<any> {
    return this.http.get<any>(this.doctorGetCountsUPL);
  }
  

  

}
