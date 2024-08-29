import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentsService } from '../../Services/departments.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: boolean = true;
  errorMessage: string | null = null;

  constructor(private _departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.addDepartmentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });
  }

  showPopup: boolean = false;
  showSuccessPopup(): void {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 30000);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const validExtensions = ['image/png', 'image/jpeg'];
    this.fileValid = validExtensions.includes(file.type);

    if (this.fileValid) {
      const fileReader = new FileReader();
      fileReader.onload = (fileReaderEvent) => {
        this.imagePreview = fileReaderEvent.target!.result;
      };
      fileReader.readAsDataURL(file);
      this.addDepartmentForm.get('photo')?.setValue(file);
    } else {
      this.addDepartmentForm.get('photo')?.setErrors({ invalidFile: true });
    }
  }

  submitForm(): void {
    this.errorMessage = null;
    if (this.addDepartmentForm.valid) {
      const formData: any = {
        name: this.addDepartmentForm.get('name')?.value,
        description: this.addDepartmentForm.get('description')?.value,
      };

      const photoFile = this.addDepartmentForm.get('photo')?.value;

      if (this.fileValid && photoFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          formData.photo = reader.result as string; // Convert file to Base64 string

          this._departmentsService.addDepartment(formData).subscribe({
            next: (response) => {
              this.showSuccessPopup();

              this.addDepartmentForm.reset();
              this.imagePreview = null;
            },
            error: (error) => {
              console.error('Error adding department:', error);
              if (error.error?.error.includes('E11000 duplicate key error')) {
                // Display a custom message for duplicate key error
                this.errorMessage = 'The name of this department already exists. Please choose a different name.';
              } else {
                // Fallback error message
                this.errorMessage = `An unknown error occurred. Please try again later.`;
              }
            },
          });
        };
        reader.readAsDataURL(photoFile); // Read the file as a Base64 string
      }
    }
  }
}
