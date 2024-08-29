import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DoctorsService } from '../../Services/doctors.service';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';
import { AppointmentsService } from '../../Services/appointments.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  BookForm!: FormGroup;
  patient_id!: string;
  patientData: any;
  doctors: any[] = [];
  slots: any[] = [];
  selectedSlot: string | null = null;

  constructor(
    private _router: Router,
    private _doctorsService: DoctorsService,
    private _authService: AuthService,
    private _patientService: PatientsService,
    private _appointmentService: AppointmentsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.BookForm = new FormGroup({
      doctor: new FormControl(null, [Validators.required]),
      slot: new FormControl(null, [Validators.required]),
    });

    this._doctorsService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });

    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.patient_id = decodedToken.userId;
    }

    this._patientService.getPatientById(this.patient_id).subscribe((data) => {
      this.patientData = data;
    });
  }

  loadSlotsForDoctor(doctorId: string) {
    this._doctorsService.getDoctorById(doctorId).subscribe((data) => {
      const currentTime = new Date();

      // Filter slots and remove past ones from the database
      this.slots = data.freeSlots.filter((slot: any) => {
        const slotDateTime = new Date(slot.date);
        const [hours, minutes] = slot.time.split(':').map(Number);
        slotDateTime.setHours(hours, minutes, 0, 0);

        if (slotDateTime < currentTime) {
          // Remove expired slot from the database
          this._doctorsService.removeFreeSlot(doctorId, slot._id).subscribe({
            next: () => {
              console.log(`Expired slot with ID ${slot._id} removed from database.`);
            },
            error: (err) => {
              console.error(`Error removing slot with ID ${slot._id}:`, err);
            }
          });
          return false; // Exclude this slot from the slots array
        }

        return true; // Include future slots
      });
    });
  }

  onDoctorChange() {
    const selectedDoctorId = this.BookForm.get('doctor')?.value;
    if (selectedDoctorId) {
      this.loadSlotsForDoctor(selectedDoctorId);
    }
  }

  submitForm() {
    if (this.BookForm.valid) {
      const selectedSlotId = this.BookForm.get('slot')?.value;
      const selectedSlot = this.slots.find(
        (slot) => slot._id === selectedSlotId
      );

      if (selectedSlot) {
        const appointment = {
          patientId: this.patient_id,
          doctorId: this.BookForm.get('doctor')?.value,
          date: selectedSlot.date,
          time: selectedSlot.time,
        };

        console.log(appointment);
        this._appointmentService.createAppointment(appointment).subscribe({
          next: (response) => {
            this.showSuccessPopup();
            // Remove the selected slot from the slots array
            this.slots = this.slots.filter(
              (slot) => slot._id !== selectedSlotId
            );

            this.BookForm.reset();
            this.selectedSlot = null;
          },
          error: (error) => {
            console.error('Error creating appointment', error);
          },
        });
      } else {
        console.log('Selected slot not found');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  showPopup: boolean = false;
  showSuccessPopup(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 30000);
  }
}
