import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DoctorsService } from '../../Services/doctors.service';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';
import { AppointmentsService } from '../../Services/appointments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-appointment-popup',
  templateUrl: './update-appointment-popup.component.html',
  styleUrls: ['./update-appointment-popup.component.css'],
})
export class UpdateAppointmentPopupComponent implements OnInit {
  @Input() showPopupForm: boolean = false;
  @Input() appointment: any = {};
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<any>();

  patient_id!: string;
  doctors: any[] = [];
  slots: any[] = [];
  selectedSlot: string | null = null;
  BookForm!: FormGroup;

  constructor(
    private _doctorsService: DoctorsService,
    private _authService: AuthService,
    private _patientService: PatientsService,
    private _appointmentService: AppointmentsService
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

    this._patientService
      .getPatientById(this.patient_id)
      .subscribe((data) => {});
  }

  loadSlotsForDoctor(doctorId: string) {
    this._doctorsService.getDoctorById(doctorId).subscribe((data) => {
      this.slots = data.freeSlots;
    });
  }

  onDoctorChange() {
    const selectedDoctorId = this.BookForm.get('doctor')?.value;
    if (selectedDoctorId) {
      this.loadSlotsForDoctor(selectedDoctorId);
    }
  }

  closePopupForm() {
    this.close.emit();
  }

  cancelUpdate() {
    this.closePopupForm();
  }

  onSubmit() {
    if (this.BookForm.valid) {
      const selectedSlotId = this.BookForm.get('slot')?.value;
      const selectedSlot = this.slots.find(
        (slot) => slot._id === selectedSlotId
      );

      if (selectedSlot) {
       this.appointment = {
          patientId: this.patient_id,
          doctorId: this.BookForm.get('doctor')?.value,
          date: selectedSlot.date,
          time: selectedSlot.time,
        };
        this.update.emit(this.appointment);
        this.closePopupForm();
        this.BookForm.reset();
        this.selectedSlot = null;
      }
    }
       
 
  }
}
