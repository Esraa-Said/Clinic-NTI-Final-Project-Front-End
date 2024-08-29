import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../../Services/doctors.service';

@Component({
  selector: 'app-doctor-profile-home',
  templateUrl: './doctor-profile-home.component.html',
  styleUrls: ['./doctor-profile-home.component.css'],
})
export class DoctorProfileHomeComponent implements OnInit {

  doctor: any | undefined;
  doctorId: String | undefined;
  doctorName: string | undefined;
  routeType: string = '';
  activeTab: string = 'overview'; // Default to 'overview' tab
  Found: Boolean = false;
 
  constructor(
    private _homeService: HomeService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    // Check if the route has the 'id' parameter
    if (this._activeRoute.snapshot.paramMap.has('id')) {
      this.routeType = 'id';
      this.doctorId = this._activeRoute.snapshot.paramMap.get('id')!;
      this.getDoctorById(this.doctorId );
    }

    // Check if the route has the 'name' parameter
    if (this._activeRoute.snapshot.paramMap.has('name')) {
      this.routeType = 'name';
      this.doctorName = this._activeRoute.snapshot.paramMap.get('name')!;
      this.getDoctorByName(this.doctorName);
    }
  }

  getDoctorById(id: String): void {
    this._doctorsService.getDoctorById(id).subscribe((data) => {
      if (data) {
        this.doctor = data;
        this.Found = true;
      } else {
        this.handleDoctorNotFound();
      }
    });
  }
  sign(){
    this._router.navigateByUrl('/Home/Sign');
  }
  getDoctorByName(name: string): void {
    this._doctorsService.getDoctorByName(name).subscribe((data) => {
      if (data) {
        this.doctor = data;
        this.Found = true;
      } else {
        this.handleDoctorNotFound();
      }
    });
  }

  handleDoctorNotFound(): void {
    this.Found = false
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
