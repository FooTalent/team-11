import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Location } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + 'location/provinces');
  }

  getCities(province: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + `location/${province}/cities`);
  }

  getLocalities(city: string): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + `location/${city}/localities`);
  }

}
