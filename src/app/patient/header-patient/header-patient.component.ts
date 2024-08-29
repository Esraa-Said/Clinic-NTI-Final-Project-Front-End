import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { SidebarService } from '../../Services/sidebar.service';
import { PatientsService } from '../../Services/patients.service';

@Component({
  selector: 'app-header-patient',
  templateUrl: './header-patient.component.html',
  styleUrl: './header-patient.component.css'
})
export class HeaderPatientComponent implements OnInit {
  userData: any;
  id: string = '';
  constructor(private _authService: AuthService, private sidebarService: SidebarService , private _patientService: PatientsService) {}
  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
        this.id= decodedToken.userId;
      
    }
    this._patientService.getPatientById(this.id).subscribe((data) => {
      this.userData = data;
    
    });
  }


  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
