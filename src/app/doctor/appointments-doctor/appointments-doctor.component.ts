import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../../Services/appointments.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-appointments-doctor',
  templateUrl: './appointments-doctor.component.html',
  styleUrl: './appointments-doctor.component.css',
})
export class AppointmentsDoctorComponent implements OnInit {
  id: string = '';

  constructor(
    private _router: Router,
    private _appointmentsService: AppointmentsService,
    private _authService: AuthService
  ) {}
  appointments: any[] = [];

  selectedAppointment: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }

    this.loadAppointments();
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
  deleteAppointment() {
    if (this.appointmentToDelete !== undefined) {
      let index = this.appointmentToDelete + (this.currentPage - 1) * this.pageSize;

      this._appointmentsService
        .AppointmentsDeleteByAppointmentId(
          this.appointments[index]._id
        )
        .subscribe({
          next: () => {
            this.showConfirmPopup = false;
            this.notificationMessage = 'Appointment deleted successfully!';
            setTimeout(() => (this.notificationMessage = null), 2000);
            this.appointments.splice(index, 1);
            this.appointmentToDelete = null;

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
    this.appointmentToDelete = null;
  }

  // update
  showUpdateForm = false;
  selectedUpdateAppointment: any;

  openUpdateForm(appointment: any) {
    this.selectedUpdateAppointment = appointment;
    this.showUpdateForm = true;
  }

  closeUpdateForm() {
    this.showUpdateForm = false;
  }

  handleStatusUpdate(updatedAppointment: any) {
    this.updateAppointment(updatedAppointment);
    this.closeUpdateForm();
  }

  updateAppointment(updatedAppointment: any) {
    updatedAppointment['doctorId'] = this.selectedUpdateAppointment.doctorId;
    updatedAppointment['patientId'] = this.selectedUpdateAppointment.patientId;
    this._appointmentsService
      .updateStatusAppointment(
        updatedAppointment,
        this.selectedUpdateAppointment._id
      )
      .subscribe({
        next: (response) => {
          console.log('Appointment updated successfully:', response);
          this.loadAppointments();
        },
        error: (error) => {
          console.error('Failed to update appointment:', error);
        },
      });
  }

  loadAppointments() {
    this._appointmentsService
      .doctorAppointmentsGetByDoctorId(this.id)
      .subscribe((data) => {
        this.appointments = data;
      });
  }
}
