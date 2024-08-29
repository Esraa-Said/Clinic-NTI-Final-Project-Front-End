import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AdminService } from '../../Services/admin.service';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userData: any;
  id: string = '';

  constructor(private _authService: AuthService, private _adminService: AdminService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }

    this._adminService.getAdminById(this.id).subscribe((data)=>{
      this.userData = data;
    })
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
