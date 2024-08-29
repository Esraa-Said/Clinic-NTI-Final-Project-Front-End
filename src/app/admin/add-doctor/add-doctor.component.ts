import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { DoctorsService } from '../../Services/doctors.service';
import { DepartmentsService } from '../../Services/departments.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements AfterViewInit, OnInit {
  doctorForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: boolean = true;
  departments: any[] = [];
  doctorImage: HTMLElement | null = null;
  errorMessages: { [key: string]: string } = {};

  ngAfterViewInit() {
    this.doctorImage = document.querySelector('.upload-circle') as HTMLDivElement;
    if (this.doctorImage) {
      console.log('Doctor image element found:', this.doctorImage);
    } else {
      console.log('Doctor image element not found');
    }
  }

  ngOnInit(): void {
    this._departmentsServices.getDepartments().subscribe((data) => {
      this.departments = data;
      const defaultDepartment = this.departments.length > 0 ? this.departments[0].name : '';

      this.doctorForm = new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
        age: new FormControl(null, [
          Validators.pattern('^[0-9]*$'),
          Validators.required,
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]{12}$'),
        ]),
        gender: new FormControl('Male', Validators.required),
        department: new FormControl(defaultDepartment, Validators.required),
        photo: new FormControl(null, [Validators.required]),
      });
    });
  }

  constructor(
    private _adminService: AdminService,
    private _doctorServices: DoctorsService,
    private _departmentsServices: DepartmentsService
  ) {}

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
        if (this.doctorImage) {
          this.doctorImage.style.backgroundImage = `url(${fileReaderEvent.target!.result})`;
        }
      };
      fileReader.readAsDataURL(file);
      this.doctorForm.get('photo')?.setValue(file);
    } else {
      this.doctorForm.get('photo')?.setErrors({ invalidFile: true });
    }
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const doctorData: any = {
        name: `Dr.${this.doctorForm.get('username')?.value}`,
        email: this.doctorForm.get('email')?.value,
        phoneNumber: this.doctorForm.get('phone')?.value,
        gender: this.doctorForm.get('gender')?.value,
        age: this.doctorForm.get('age')?.value,
        department: this.departments.find(depart => depart.name === this.doctorForm.get('department')?.value)?._id,
      };

      const photoFile = this.doctorForm.get('photo')?.value;
      if (this.fileValid && photoFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          doctorData.photo = reader.result as string;

          this._doctorServices.addDoctor(doctorData).subscribe({
            next: (response) => {
              this.showSuccessPopup();

              // Reset the form and image preview
              this.doctorForm.reset();
              this.imagePreview = null;
              if (this.doctorImage) {
                this.doctorImage.style.backgroundImage = '';
              }
            },
            error: (error) => {
              console.error('Error adding doctor:', error);
              this.handleError(error);
            }
          });
        };
        reader.readAsDataURL(photoFile);
      } else {
        this._doctorServices.addDoctor(doctorData).subscribe({
          next: (response) => {
            console.log('Doctor added successfully:', response);
            this.showSuccessPopup();

            // Reset the form and image preview
            this.doctorForm.reset();
            this.imagePreview = null;
            if (this.doctorImage) {
              this.doctorImage.style.backgroundImage = '';
            }
          },
          error: (error) => {
            console.error('Error adding doctor:', error);
            this.handleError(error);
          }
        });
      }
    }
  }

  handleError(error: any): void {
    if (error.error?.error) {
      if (error.error.error.includes('E11000 duplicate key error')) {
        this.errorMessages['server'] = 'A doctor with this email or name already exists.';
      } else if (error.error.error.includes('Invalid email format')) {
        this.errorMessages['email'] = 'Invalid email format.';
      } else if (error.error.error.includes('Invalid name format')) {
        this.errorMessages['name'] = 'Invalid name format. Only letters and spaces are allowed.' ;

      } else if (error.error.error.includes('Invalid phone number format')) {
        this.errorMessages['phone'] = 'Invalid phone number format. Only 12 digits are allowed.';
      } else {
        this.errorMessages['server'] = 'An unexpected error occurred. Please try again.';
      }
    }
  }

  getErrorMessageKeys(): string[] {
    return Object.keys(this.errorMessages);
  }
  
}
