import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../Services/sidebar.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe(
      visibility => this.isSidebarVisible = visibility
    );
  }
}
