import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendContactForm(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}contact`, formData);
  }
}
