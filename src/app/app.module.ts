import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { provideHttpClient } from '@angular/common/http';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderHomeComponent } from './home/header-home/header-home.component';
import { FirstContentHomeComponent } from './home/first-content-home/first-content-home.component';
import { FooterHomeComponent } from './home/footer-home/footer-home.component';
import { DoctorsHomeComponent } from './home/doctors-home/doctors-home.component';
import { FormsModule } from '@angular/forms';
import { DoctorProfileHomeComponent } from './home/doctor-profile-home/doctor-profile-home.component';
import { DepartmentsHomeComponent } from './home/departments-home/departments-home.component';
import { SignInHomeComponent } from './home/sign-in-home/sign-in-home.component';
import { SignUpHomeComponent } from './home/sign-up-home/sign-up-home.component';
import { PatientComponent } from './patient/patient.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { SidebarPatientComponent } from './patient/sidebar-patient/sidebar-patient.component';
import { HeaderPatientComponent } from './patient/header-patient/header-patient.component';
import { DashboardPatientComponent } from './patient/dashboard-patient/dashboard-patient.component';
import { AppointmentsPatientComponent } from './patient/appointments-patient/appointments-patient.component';
import { SettingsPatientComponent } from './patient/settings-patient/settings-patient.component';
import { SignComponent } from './home/sign/sign.component';
import { ConfirmPopupComponent } from './admin/confirm-popup/confirm-popup.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HeaderDoctorComponent } from './doctor/header-doctor/header-doctor.component';
import { SidebarDoctorComponent } from './doctor/sidebar-doctor/sidebar-doctor.component';
import { DashboardDoctorComponent } from './doctor/dashboard-doctor/dashboard-doctor.component';
import { SettingsDoctorComponent } from './doctor/settings-doctor/settings-doctor.component';
import { AppointmentsDoctorComponent } from './doctor/appointments-doctor/appointments-doctor.component';
import { AddFreeSlotComponent } from './doctor/add-free-slot/add-free-slot.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// calender
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MyFreeSlotsComponent } from './doctor/my-free-slots/my-free-slots.component';
import { UpdateAppointmentPopupComponent } from './patient/update-appointment-popup/update-appointment-popup.component';
import { UpdateStatusComponent } from './doctor/update-status/update-status.component';
import { AddDepartmentComponent } from './admin/add-department/add-department.component';
import { DepartmentsComponent } from './admin/departments/departments.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    AppointmentsComponent,
    DoctorsComponent,
    PatientsComponent,
    AddDoctorComponent,
    HomeComponent,
    HeaderHomeComponent,
    FirstContentHomeComponent,
    FooterHomeComponent,
    DoctorsHomeComponent,
    DoctorProfileHomeComponent,
    DepartmentsHomeComponent,
    SignInHomeComponent,
    SignUpHomeComponent,
    PatientComponent,
    BookAppointmentComponent,
    AboutusComponent,
    SidebarPatientComponent,
    HeaderPatientComponent,
    DashboardPatientComponent,
    AppointmentsPatientComponent,
    SettingsPatientComponent,
    SignComponent,
    ConfirmPopupComponent,
    SettingsComponent,
    DoctorComponent,
    HeaderDoctorComponent,
    SidebarDoctorComponent,
    DashboardDoctorComponent,
    SettingsDoctorComponent,
    AppointmentsDoctorComponent,
    AddFreeSlotComponent,
    MyFreeSlotsComponent,
    UpdateAppointmentPopupComponent,
    UpdateStatusComponent,
    AddDepartmentComponent,
    DepartmentsComponent,
    SuccessPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
