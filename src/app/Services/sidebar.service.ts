import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarVisibility = new BehaviorSubject<boolean>(true);
  sidebarVisibility$ = this.sidebarVisibility.asObservable();

  toggleSidebar() {
    this.sidebarVisibility.next(!this.sidebarVisibility.value);
  }
}
