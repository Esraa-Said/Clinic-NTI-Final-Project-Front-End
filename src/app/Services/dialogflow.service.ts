import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private apiUrl = 'http://localhost:3000/webhook/chat'; 

  constructor(private http: HttpClient) { }

  sendMessage(textQuery: string, sessionId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'session-id': sessionId
    });

    return this.http.post<any>(this.apiUrl, { textQuery }, { headers });
  }
}
