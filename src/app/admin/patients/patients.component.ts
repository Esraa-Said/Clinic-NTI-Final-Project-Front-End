import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { PatientsService } from '../../Services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients: any[] = [];
  pageSize = 3; // Number of patients per page
  currentPage = 1;

  selectedPatient: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  constructor(private _adminService: AdminService, private _router: Router, private _patientsService: PatientsService) {}

  ngOnInit(): void {
    this._patientsService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  addNewPatient() {
    this._router.navigateByUrl('/Admin/AddPatient');
  }

  get pagedPatients() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.patients.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.patients.length / this.pageSize);
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




  // Delete Patient
  showConfirmPopup: boolean = false;
  patientToDelete: any;
  initiateDelete(id: any): void {
    this.patientToDelete = id;
    this.showConfirmPopup = true;
    this.confirmMessage = `Are you sure you want to delete this patient?`;

  }
  deletePatient(){
    if (this.patientToDelete !== undefined) {
      let index = this.patientToDelete + (this.currentPage - 1) * this.pageSize;

      this._patientsService.deletePatient(this.patients[index]._id).subscribe({
        next: () => {
          this.showConfirmPopup = false;
          this.notificationMessage = 'Patient deleted successfully!';
          setTimeout(() => this.notificationMessage = null, 2000); 
          this.patients.splice(index, 1);
          this.patientToDelete = null;

        },
        error: () => {
          this.notificationMessage = 'Error deleting patient.';
          setTimeout(() => this.notificationMessage = null, 2000); 
        }
      });
    }
  }
  cancelDelete(): void {
    this.showConfirmPopup = false;
    this.patientToDelete = null;
  }

  
}
