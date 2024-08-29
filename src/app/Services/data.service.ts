import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }
}
