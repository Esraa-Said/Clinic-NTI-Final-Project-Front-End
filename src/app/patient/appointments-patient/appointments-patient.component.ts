import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';
import { AppointmentsService } from '../../Services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments-patient',
  templateUrl: './appointments-patient.component.html',
  styleUrl: './appointments-patient.component.css',
})
export class AppointmentsPatientComponent implements OnInit{

  id: string = '';
 
  
  constructor( private _router: Router, private _appointmentsService : AppointmentsService, private _authService: AuthService) {}
  appointments: any[] = [];

  selectedAppointment: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  ngOnInit(): void {

    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
        this.id= decodedToken.userId;
      
    }

    this._appointmentsService.patientAppointmentsGetByPatientId(this.id).subscribe((data) => {
      this.appointments = data;
    });
  }


  pageSize = 8; 
  currentPage = 1;

  get pagedAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.appointments.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.appointments.length / this.pageSize);
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

   // Delete Appointments
   showConfirmPopup: boolean = false;
   appointmentToDelete: any;
   initiateDelete(id: any): void {
     this.appointmentToDelete = id;
     this.showConfirmPopup = true;
     this.confirmMessage = `Are you sure you want to delete this appointment?`;

   }
   deleteAppointment(){
    if (this.appointmentToDelete !== undefined) {
      let index = this.appointmentToDelete + (this.currentPage - 1) * this.pageSize;

       this._appointmentsService.AppointmentsDeleteByAppointmentId(this.appointments[index]._id).subscribe({
         next: () => {
           this.showConfirmPopup = false;
           this.notificationMessage = 'Appointment deleted successfully!';
           setTimeout(() => this.notificationMessage = null, 2000); 
           this.appointments.splice(index, 1);
           this.appointmentToDelete = null;

         },
         error: () => {
           this.notificationMessage = 'Error deleting doctor.';
           setTimeout(() => this.notificationMessage = null, 2000); 
         }
       });
     }
   }
   cancelDelete(): void {
     this.showConfirmPopup = false;
     this.appointmentToDelete = null;
   }
 
   // update appointment
   showPopupForm: boolean = false;
   selectedUpdatedAppointment: any = {};
 
   openPopupForm(appointment: any) {
     this.selectedUpdatedAppointment = { ...appointment };
     this.showPopupForm = true;
   }
 
   closePopupForm() {
     this.showPopupForm = false;
   }
 
   updateAppointment(updatedAppointment: any) {
   
    this._appointmentsService.updateAppointment(updatedAppointment, this.selectedUpdatedAppointment._id ).subscribe({
      next: response => {
  
        // Refresh the list of appointments by reloading the data
        this._appointmentsService.patientAppointmentsGetByPatientId(this.id).subscribe((data) => {
          this.appointments = data;
        });  
      
      },
      error: error => {
        console.error('Failed to update appointment:', error);
      }}
    )
     this.closePopupForm();
   }
}

