import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { DoctorsService } from '../../Services/doctors.service';
import { DepartmentsService } from '../../Services/departments.service';

@Component({
  selector: 'app-departments-home',
  templateUrl: './departments-home.component.html',
  styleUrl: './departments-home.component.css'
})
export class DepartmentsHomeComponent implements OnInit{
departments: any[] = [];

constructor(  private _homeService: HomeService, private _departmentsService: DepartmentsService){}

ngOnInit(): void {
    this._departmentsService.getDepartments().subscribe((data)=>{
      this.departments = data;
      console.log(this.departments)
    })
}

}
