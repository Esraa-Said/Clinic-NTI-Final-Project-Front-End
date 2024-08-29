import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css'
})
export class DashboardPatientComponent  implements OnInit {
  userData: any;
  value: any = 650;
  id: string = '';
  constructor(private _authService: AuthService, private _patientsServices: PatientsService) {}
  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
        this.id= decodedToken.userId;
      
    }
    this._patientsServices.getPatientById(this.id).subscribe((data) => {
      this.userData = data;
    
    });
  }

}
