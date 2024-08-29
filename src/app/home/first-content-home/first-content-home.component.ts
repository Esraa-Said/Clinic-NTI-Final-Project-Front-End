import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { Router } from '@angular/router';
import { DepartmentsService } from '../../Services/departments.service';
import { DoctorsService } from '../../Services/doctors.service';

@Component({
  selector: 'app-first-content-home',
  templateUrl: './first-content-home.component.html',
  styleUrl: './first-content-home.component.css',
})
export class FirstContentHomeComponent {
  doctorName: string = '';
  departments: any[] = [];
  doctors: any[] = [];

  constructor(private _homeService: HomeService, private _router: Router,  private _departmentsService: DepartmentsService,
    private _doctorsServices : DoctorsService
  ) {}

 

ngOnInit(): void {
    this._departmentsService.getDepartments().subscribe((data)=>{
      this.departments = data;
    })

    this._doctorsServices.getDoctors().subscribe((data)=>{
      this.doctors = data;
    })
}

DisplayDoctorProfile() {
  if (this.doctorName) {
    this._router.navigate(['Home/DoctorProfileName/', this.doctorName]);
  }  }

  goToDoctorProfileId(doctorId: string){
    
      this._router.navigate(['Home/DoctorProfileId/', doctorId]);
    }
  

  goAboutUs(){
    this._router.navigateByUrl('/Home/AboutUs');
  }
  goDepartments(){
    this._router.navigateByUrl('/Home/Departments');
  }
  goDoctors(){
    this._router.navigateByUrl('/Home/Doctors');
  }




}
