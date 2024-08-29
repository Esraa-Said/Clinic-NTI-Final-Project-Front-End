import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../Services/departments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit{
  constructor( private _router: Router, private _departmentsService : DepartmentsService) {}
  departments: any[] = [];


  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this._departmentsService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  addNewDepartment(){
    this._router.navigateByUrl("/Admin/AddDepartment");

  }
 

  pageSize = 3; 
  currentPage = 1;

  get pagedDepartments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.departments.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.departments.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
