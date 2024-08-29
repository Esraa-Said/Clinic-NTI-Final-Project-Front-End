import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { HomeComponent } from './home/home.component';
import { DoctorsHomeComponent } from './home/doctors-home/doctors-home.component';
import { DoctorProfileHomeComponent } from './home/doctor-profile-home/doctor-profile-home.component';
import { DepartmentsHomeComponent } from './home/departments-home/departments-home.component';
import { SignInHomeComponent } from './home/sign-in-home/sign-in-home.component';
import { SignUpHomeComponent } from './home/sign-up-home/sign-up-home.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { FirstContentHomeComponent } from './home/first-content-home/first-content-home.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardPatientComponent } from './patient/dashboard-patient/dashboard-patient.component';
import { AppointmentsPatientComponent } from './patient/appointments-patient/appointments-patient.component';
import { SettingsPatientComponent } from './patient/settings-patient/settings-patient.component';
import { SignComponent } from './home/sign/sign.component';
import { authGuard } from './Guards/auth.guard';
import { SettingsComponent } from './admin/settings/settings.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DashboardDoctorComponent } from './doctor/dashboard-doctor/dashboard-doctor.component';
import { SettingsDoctorComponent } from './doctor/settings-doctor/settings-doctor.component';
import { AppointmentsDoctorComponent } from './doctor/appointments-doctor/appointments-doctor.component';
import { AddFreeSlotComponent } from './doctor/add-free-slot/add-free-slot.component';
import { MyFreeSlotsComponent } from './doctor/my-free-slots/my-free-slots.component';
import { DepartmentsComponent } from './admin/departments/departments.component';
import { AddDepartmentComponent } from './admin/add-department/add-department.component';

const routes: Routes = [
  // Home Default
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      { path: '', component: FirstContentHomeComponent }, // Default child route
      { path: 'Doctors', component: DoctorsHomeComponent },
      { path: 'DoctorProfileId/:id', component: DoctorProfileHomeComponent },
      {
        path: 'DoctorProfileName/:name',
        component: DoctorProfileHomeComponent,
      },
      { path: 'Departments', component: DepartmentsHomeComponent },
      { path: 'Sign', redirectTo: 'Sign/SignUp', pathMatch: 'full' },

      {
        path: 'Sign',
        component: SignComponent,
        children: [
          { path: 'SignIn', component: SignInHomeComponent },
          { path: 'SignUp', component: SignUpHomeComponent },
        ],
      },
      { path: 'AboutUs', component: AboutusComponent },
    ],
  },

  // Patient
  { path: 'Patient', redirectTo: 'Patient/Dashboard', pathMatch: 'full'  
  },
  {
    path: 'Patient',
    component: PatientComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        component: DashboardPatientComponent,
        canActivate: [authGuard],
      }, 
      {
        path: 'Dashboard',
        component: DashboardPatientComponent,
        canActivate: [authGuard],
      },
      {
        path: 'BookAppointment',
        component: BookAppointmentComponent,
        canActivate: [authGuard],
      },
      {
        path: 'MyAppointments',
        component: AppointmentsPatientComponent,
        canActivate: [authGuard],
      },
      {
        path: 'Settings',
        component: SettingsPatientComponent,
        canActivate: [authGuard],
      },
    ],
  },

  // Admin
  { path: 'Admin', redirectTo: 'Admin/Dashboard', pathMatch: 'full'},
  {
    path: 'Admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent ,canActivate: [authGuard]},
      { path: 'Dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'Appointments', component: AppointmentsComponent ,canActivate: [authGuard]},
      { path: 'Departments', component: DepartmentsComponent ,canActivate: [authGuard]},
      { path: 'Settings', component: SettingsComponent , canActivate: [authGuard]},
      { path: 'Doctors', component: DoctorsComponent , canActivate: [authGuard]},
      { path: 'Patients', component: PatientsComponent , canActivate: [authGuard]},
      { path: 'AddDoctor', component: AddDoctorComponent, canActivate: [authGuard] },
      { path: 'AddDepartment', component: AddDepartmentComponent, canActivate: [authGuard] },
      
    ],
  },


  // Doctor
  { path: 'Doctor', redirectTo: 'Doctor/Dashboard', pathMatch: 'full'  
  },
  {
    path: 'Doctor',
    component: DoctorComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        component: DashboardDoctorComponent,
        canActivate: [authGuard],
      }, 
      {
        path: 'Dashboard',
        component: DashboardDoctorComponent,
        canActivate: [authGuard],
      },
      {
        path: 'AddFreeAppointment',
        component: AddFreeSlotComponent,
        canActivate: [authGuard],
      },
      {
        path: 'MyAppointments',
        component: AppointmentsDoctorComponent,
        canActivate: [authGuard],
      },
      {
        path: 'MyFreeSlots',
        component: MyFreeSlotsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'Settings',
        component: SettingsDoctorComponent,
        canActivate: [authGuard],
      },
    ],
  },

  //  404 page
  { path: '**', redirectTo: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
