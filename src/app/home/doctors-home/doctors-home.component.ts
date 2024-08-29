import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { Router } from '@angular/router';
import { DoctorsService } from '../../Services/doctors.service';

@Component({
  selector: 'app-doctors-home',
  templateUrl: './doctors-home.component.html',
  styleUrls: ['./doctors-home.component.css'],
})
export class DoctorsHomeComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchQuery: string = '';

  constructor(private _homeService: HomeService, private _router: Router, private _doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this._doctorsService.getDoctors().subscribe((data) => {
      this.doctors = data;
      this.filteredDoctors = this.doctors;
    });
  }

  searchDoctor() {
    if (this.searchQuery) {
      this.filteredDoctors = this.doctors.filter((doctor) =>
        doctor.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDoctors = this.doctors;
    }
  }

  DisplayDoctorProfile(id: number){

    this._router.navigateByUrl(`/Home/DoctorProfileId/${this.doctors[id]._id}`);

  }


  // animation
  
}
