import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { PatientsService } from '../../Services/patients.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.css'],
})
export class SidebarPatientComponent implements OnInit {
  togglePlus: boolean | null = false;
  id: string = '';
  userData: any;
  isSidebarVisible!: boolean;
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: Boolean = true;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _authService: AuthService,
    private _patientsServices: PatientsService,
    private _router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }
    this._patientsServices.getPatientById(this.id).subscribe((data) => {
      this.userData = data;
      this.imagePreview = this.userData.photo; // Set initial image preview
    });

    this.sidebarService.sidebarVisibility$.subscribe(
      (visibility) => (this.isSidebarVisible = visibility)
    );
  }

  onPlusClick(): void {
    this.togglePlus = !this.togglePlus;
    const plusSign = document.querySelector('.plus');
    const appointments = document.querySelector('#appointments');
    const items = document.querySelector('.menu-items');

    if (this.togglePlus && items?.classList.contains('active')) {
      plusSign?.classList.add('rotate');
      appointments?.classList.add('appointmentsClicked');
      items?.classList.remove('active');
    } else {
      plusSign?.classList.remove('rotate');
      appointments?.classList.remove('appointmentsClicked');
    }
  }

  get plusSignText(): string {
    return this.togglePlus ? '-' : '+';
  }

  logOut() {
    this._authService.logOut();
    this._router.navigateByUrl('/Home');
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const validExtensions = ['image/png', 'image/jpeg'];
      this.fileValid = validExtensions.includes(file.type);

      if (this.fileValid) {
        const fileReader = new FileReader();
        fileReader.onload = (fileReaderEvent) => {
          this.imagePreview = fileReaderEvent.target!.result;
          const base64String = (fileReaderEvent.target!.result as string).split(',')[1];
          this.sendImageToBackend(base64String);
        };
        fileReader.readAsDataURL(file);
      } else {
        console.error('Invalid file type');
        this.fileValid = false;
      }
    } else {
      console.error('No file selected');
      this.fileValid = false;
    }
  }

  sendImageToBackend(base64String: string) {
    const photoData = {
      photo: `data:image/png;base64,${base64String}`
    };

    this._patientsServices.updatePatientPhoto(photoData, this.id).subscribe({
      next: (response) => {
        console.log('Photo updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating photo:', error);
      }
    });
  }
}
