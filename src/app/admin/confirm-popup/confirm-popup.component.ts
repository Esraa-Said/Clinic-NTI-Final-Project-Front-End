import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css'
})
export class ConfirmPopupComponent {
  @Input() showPopup: boolean = false;
  @Input() message: string = 'Are you sure?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirmDelete(): void {
    this.confirmed.emit();
    this.closePopup();
  }

  cancel(): void {
    this.cancelled.emit();
    this.closePopup();
  }

  private closePopup(): void {
    this.showPopup = false;
  }
}
