import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../Services/patients.service';
import { DoctorsService } from '../../Services/doctors.service';
import { AppointmentsService } from '../../Services/appointments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  numberOfPatients = 0;
  numberOfDoctors = 0;
  numberOfAppointments = 0;


  constructor(private _patientService: PatientsService, private _doctorService: DoctorsService, private _appointments : AppointmentsService){}

  ngOnInit(): void {
      this._doctorService.getDoctorsCounts().subscribe((data)=>{
        this.numberOfDoctors = data.count;
      })
      this._patientService.getPatientsCounts().subscribe((data)=>{
        this.numberOfPatients = data.count;
      })
      this._appointments.AppointmentsCountGet().subscribe((data)=>{
        this.numberOfAppointments = data.count;
      })
  }

}
