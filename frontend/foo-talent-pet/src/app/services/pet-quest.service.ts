import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PetQuestService {
  private baseUrl = 'https://pet-quest.onrender.com/api/';

  constructor(private http: HttpClient) { }

//método getEndpointData() que recibe un parámetro endpoint de tipo string y retorna un Observable<any> que realiza una petición GET a la API con la URL base y el endpoint recibido como parámetro.
  getEndpointData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }
}