import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  @Input() isVisible: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closePopup(): void {
    this.isVisible = false;
    this.close.emit(); // Emit the event to notify the parent component
  }
}
