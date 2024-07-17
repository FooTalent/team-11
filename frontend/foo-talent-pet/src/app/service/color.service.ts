import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Color } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.apiUrl}colors`);
  }
}
