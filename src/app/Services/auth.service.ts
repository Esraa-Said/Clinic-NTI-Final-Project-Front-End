import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isNavigatedToHome = false;


  private loginUrl = 'http://localhost:3000/user/login';
  private signUpUrl = 'http://localhost:3000/patient';

  private localStorageAvailable = typeof localStorage !== 'undefined';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    if (this.localStorageAvailable) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.tokenSubject.next(token);
      }
    }
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string }>(this.loginUrl, credentials, { headers }).pipe(
      map(response => {
        if (response.token) {
          this.setToken(response.token);
          this.tokenSubject.next(response.token);
          this.isNavigatedToHome = false;
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  signUp(formData: FormData): Observable<any> {
    return this.http.post<any>(this.signUpUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  setToken(token: string): void {
    if (this.localStorageAvailable) {
      localStorage.setItem('accessToken', token);
    }
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getDecodedToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }

  logOut(): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem('accessToken');
      this.isNavigatedToHome = true;
    }
    this.tokenSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      if (error.status === 400) {
        errorMessage = error.error || 'Bad Request';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized. Please check your credentials.';
      }
    }
    return throwError(() => new Error(errorMessage));
  }


  setNavigatedToHome(value: boolean): void {
    this.isNavigatedToHome = value;
  }

}
