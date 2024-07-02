import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = 'https://pet-quest.onrender.com/api/';

  constructor(private http: HttpClient) { }

  getEndpointData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }
}