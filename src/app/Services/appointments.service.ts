import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  patientAppointmentsGetByPatientIdUPL = 'http://localhost:3000/appointment/patient/';
  doctorAppointmentsGetByDoctorIdUPL = 'http://localhost:3000/appointment/doctor/';
  AppointmentsDeleteByAppointmentIdUPL = 'http://localhost:3000/appointment/';
  AppointmentsGetUPL = 'http://localhost:3000/appointment';
  AppointmentsCreateUPL = 'http://localhost:3000/appointment';
  AppointmentsUpdateUPL = 'http://localhost:3000/appointment';
  doctorAppointmentsCountUPL = 'http://localhost:3000/appointment';
  AppointmentsCountUPL = 'http://localhost:3000/appointment/count';



  constructor(private http: HttpClient) { }
  patientAppointmentsGetByPatientId(id: String): Observable<any> {
    const url = `${this.patientAppointmentsGetByPatientIdUPL}${id}`;
    return this.http.get<any>(url);
  }

  doctorAppointmentsGetByDoctorId(id: String): Observable<any> {
    const url = `${this.doctorAppointmentsGetByDoctorIdUPL}${id}`;
    return this.http.get<any>(url);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.AppointmentsCreateUPL, appointment);
  }
  updateAppointment(appointment: any, id: String): Observable<any> {
    return this.http.put<any>(`${this.AppointmentsUpdateUPL}/${id}`, appointment);
  }
  updateStatusAppointment(appointment: any, id: String): Observable<any> {
    return this.http.put<any>(`${this.AppointmentsUpdateUPL}/${id}/photo`, appointment);
  }

  AppointmentsDeleteByAppointmentId(id: String): Observable<any> {
    const url = `${this.AppointmentsDeleteByAppointmentIdUPL}${id}`;
    return this.http.delete<any>(url);
  }


  AppointmentsGet(): Observable<any> {
    return this.http.get<any>(this.AppointmentsGetUPL);
  }
  AppointmentsCountGet(): Observable<any> {
    return this.http.get<any>(this.AppointmentsCountUPL);
  }

  getDoctorsAppointmentsCounts(id : String): Observable<any> {
    return this.http.get<any>(`${this.doctorAppointmentsCountUPL}/${id}/appointment-count`);
  }
  

}
