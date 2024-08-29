import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { DoctorsService } from '../../Services/doctors.service';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-header-doctor',
  templateUrl: './header-doctor.component.html',
  styleUrl: './header-doctor.component.css'
})
export class HeaderDoctorComponent implements OnInit {
  userData: any;
  id: string = '';
  constructor(private _authService: AuthService,  private _doctorService: DoctorsService, private sidebarService: SidebarService) {}
  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
        this.id= decodedToken.userId;
      
    }
    this._doctorService.getDoctorById(this.id).subscribe((data) => {
      this.userData = data;
    
    });
  }


  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
