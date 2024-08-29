import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { DoctorsService } from '../../Services/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _doctorsService: DoctorsService
  ) {}
  doctors: any[] = [];

  selectedDoctor: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  ngOnInit(): void {
    this._doctorsService.getDoctors().subscribe((data) => {
      this.doctors = data;
      // console.log(this.doctors);
    });
  }

  addNewDoctor() {
    this._router.navigateByUrl('/Admin/AddDoctor');
  }

  pageSize = 3; // Number of doctors per page
  currentPage = 1;

  get pagedDoctors() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.doctors.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.doctors.length / this.pageSize);
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

  // Delete Doctor
  showConfirmPopup: boolean = false;
  doctorToDelete: any;
  initiateDelete(id: any): void {
    this.doctorToDelete = id;
    this.showConfirmPopup = true;
    this.confirmMessage = `Are you sure you want to delete this doctor?`;
  }
  deleteDoctor() {
    if (this.doctorToDelete !== undefined) {
      let index = this.doctorToDelete + (this.currentPage - 1) * this.pageSize;
      this._doctorsService.deleteDoctor(this.doctors[index]._id).subscribe({
        next: () => {
          this.showConfirmPopup = false;

          this.notificationMessage = 'Doctor deleted successfully!';
          setTimeout(() => (this.notificationMessage = null), 2000);
          console.log(this.doctors);
          this.doctors.splice(index, 1);
          console.log(this.doctors);
          this.doctorToDelete = null;
        },
        error: () => {
          this.notificationMessage = 'Error deleting doctor.';
          setTimeout(() => (this.notificationMessage = null), 2000);
        },
      });
    }
  }
  cancelDelete(): void {
    this.showConfirmPopup = false;
    this.doctorToDelete = null;
  }
}
