import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Color, Tag } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}tags`);
  }
}
