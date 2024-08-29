import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent implements OnInit{
  isScrolled: boolean = false;
  isUserSignedIn: boolean = false;
  menuOpen = false;
  constructor(private renderer: Renderer2, private router: Router, private _authService : AuthService) {
    // Close menu on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuOpen = false;
      }
    });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  ngOnInit(): void {
    // this._authService.isUserSignedIn().subscribe(status => {
    //   this.isUserSignedIn = status;
    // });
  }
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 50;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const menuElement = document.querySelector('#options');
    const menuIcon = document.querySelector('#menu-icon');

    if (menuElement && !menuElement.contains(clickedElement) && !menuIcon?.contains(clickedElement)) {
      this.menuOpen = false;
    }
  }

}
