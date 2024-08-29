import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible!: boolean;
  userData: any;
  id: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: Boolean = true;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _adminService: AdminService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }

    this._adminService.getAdminById(this.id).subscribe((data) => {
      this.userData = data;
      this.imagePreview = this.userData.photo; // Set initial image preview
    });

    this.sidebarService.sidebarVisibility$.subscribe(
      visibility => this.isSidebarVisible = visibility
    );
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

    this._adminService.updateAdminPhoto(photoData, this.id).subscribe({
      next: (response) => {
        console.log('Photo updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating photo:', error);
      }
    });
  }
}
