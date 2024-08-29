import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../Services/sidebar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe(
      visibility => this.isSidebarVisible = visibility
    );
  }
}
