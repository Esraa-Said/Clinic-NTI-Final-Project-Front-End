import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DoctorsService } from '../../Services/doctors.service';
import { AuthService } from '../../Services/auth.service';

interface TimeSlot {
  time: string;
  occupied: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-add-free-slot',
  templateUrl: './add-free-slot.component.html',
  styleUrls: ['./add-free-slot.component.css'],
})
export class AddFreeSlotComponent implements OnInit {
  currentMonth!: string;
  currentYear!: number;
  calendarDays: any[] = [];
  dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  selectedDate: any;
  timeSlots: TimeSlot[] = [];
  doctorData: any;
  id!: string;

  constructor(
    private _doctorService: DoctorsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.selectedDate = moment();
    this.currentMonth = this.selectedDate.format('MMMM');
    this.currentYear = this.selectedDate.year();

    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }

    this.loadDoctorData();
  }

  loadDoctorData(): void {
    this._doctorService.getDoctorById(this.id).subscribe((data) => {
      this.doctorData = data;
      this.generateCalendar();
      this.initializeTimeSlots();
    });
  }

  initializeTimeSlots(): void {
    const times = [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
    ];

    // Retrieve existing free slots for the selected date
    const existingSlots = this.doctorData.freeSlots
      .filter((slot: any) => moment(slot.date).isSame(this.selectedDate, 'day'))
      .map((slot: any) => slot.time);

    this.timeSlots = times.map((time) => ({
      time,
      occupied: existingSlots.includes(time),
      selected: false,
    }));
  }

  selectSlot(slot: TimeSlot): void {
    if (!slot.occupied) {
      slot.selected = !slot.selected;
    }
  }

  saveSelectedSlots() {
    const slotsToSave = this.timeSlots
      .filter((slot) => slot.selected && !slot.occupied)
      .map((slot) => ({
        date: this.selectedDate.format('YYYY-MM-DD'),
        time: slot.time,
      }));

    if (slotsToSave.length > 0) {
      this._doctorService.addFreeSlots(this.id, slotsToSave).subscribe({
        next: (response) => {
          console.log('Free slots added:', response);
          this.loadDoctorData(); // Reload doctor data to refresh time slots
        },
        error: (error) => {
          console.error('Error saving slots:', error);
        },
      });
    }
  }

  generateCalendar() {
    const startOfMonth = this.selectedDate
      .clone()
      .startOf('month')
      .startOf('week');
    const endOfMonth = this.selectedDate.clone().endOf('month').endOf('week');

    let date = startOfMonth.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endOfMonth, 'day')) {
      calendar.push({
        date: date.add(1, 'day').date(),
        isToday: date.isSame(new Date(), 'day'),
        isSelected: date.isSame(this.selectedDate, 'day'),
      });
    }

    this.calendarDays = calendar;
  }

  prevMonth() {
    this.selectedDate = this.selectedDate.clone().subtract(1, 'month');
    this.currentMonth = this.selectedDate.format('MMMM');
    this.currentYear = this.selectedDate.year();
    this.generateCalendar();
  }

  nextMonth() {
    this.selectedDate = this.selectedDate.clone().add(1, 'month');
    this.currentMonth = this.selectedDate.format('MMMM');
    this.currentYear = this.selectedDate.year();
    this.generateCalendar();
  }

  selectDay(day: any) {
    this.selectedDate = moment()
      .date(day.date)
      .month(this.currentMonth)
      .year(this.currentYear);
    this.initializeTimeSlots(); // Refresh time slots for the new selected day
    this.generateCalendar();
  }
}
