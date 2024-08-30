import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';
import { DoctorsService } from '../../Services/doctors.service';
import { AppointmentsService } from '../../Services/appointments.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrl: './dashboard-doctor.component.css',
})
export class DashboardDoctorComponent implements OnInit {
  userData: any;
  value: any = 10;
  id: string = '';
  appointmentsCount: number = 0;
  constructor(
    private _authService: AuthService,
    private _patientsServices: PatientsService,
    private _doctorService: DoctorsService,
    private _appointmentsService: AppointmentsService
  ) {}
  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }
    this._doctorService.getDoctorById(this.id).subscribe((data) => {
      this.userData = data;
    });

    this._appointmentsService.getDoctorsAppointmentsCounts(this.id).subscribe((data)=>{
      this.appointmentsCount = data.count;
      console.log(data)
    })

  }
}
