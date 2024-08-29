import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { AppointmentsService } from '../../Services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  
  constructor( private _router: Router, private _appointmentsService : AppointmentsService) {}
  appointments: any[] = [];

  selectedAppointment: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  ngOnInit(): void {
    this._appointmentsService.AppointmentsGet().subscribe((data) => {
      this.appointments = data;
     console.log(this.appointments);
    });
  }

 

  pageSize = 8; // Number of doctors per page
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

  
}

