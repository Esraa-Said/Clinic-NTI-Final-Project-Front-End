import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../Services/sidebar.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe(
      visibility => this.isSidebarVisible = visibility
    );
  }
}
