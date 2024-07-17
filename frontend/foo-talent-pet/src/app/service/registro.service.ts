import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { registro } from '../interfaces/interfaces';
import { environment } from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

private baseUrl = environment.apiUrl + 'registro';
  

  constructor(private http: HttpClient) { }
  register(payload:any): Observable<registro>{
    return this.http.post<registro>(this.baseUrl, payload)
  }
}
