import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.css'
})
export class UpdateStatusComponent implements OnInit {
  @Input() appointment: any;
  @Output() statusUpdated = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();

  statusForm!: FormGroup;



  ngOnInit() {
    this.statusForm = new FormGroup({
      status: new FormControl('')
    });
  }

  onSubmit() {
    if (this.statusForm.valid) {
      const updatedAppointment = { ...this.appointment, status: this.statusForm.value.status };
      this.statusUpdated.emit(updatedAppointment);
    }
  }

  onCancel() {
    this.formCancelled.emit();
  }
}