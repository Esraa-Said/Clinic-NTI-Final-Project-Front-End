import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { DepartmentsService } from '../../Services/departments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutusComponent implements OnInit {
 
  departments: any[] = [];

  constructor(
    private _homeService: HomeService,
    private _departmentsService: DepartmentsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._departmentsService.getDepartments().subscribe((data) => {
      this.departments = data.users;
      console.log(this.departments);
    });
  }

  goDepartments() {
    this._router.navigateByUrl('/Home/Departments');
  }
  goDoctors() {
    this._router.navigateByUrl('/Home/Doctors');
  }

  scrollToStory() {
    const element = document.getElementById('section-two');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  subscribe(){
    this._router.navigateByUrl('/Home/Sign');

  }
}
