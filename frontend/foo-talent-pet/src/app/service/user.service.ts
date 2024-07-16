import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../interfaces/interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(token: string): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };

    return this.http.get<User>(this.apiUrl + 'users/me', options);
  }

  saveUser(
    user: User,
    token: string
  ): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = {
      email: user.email,
      name: user.name,
      country: user.country,
      province: user.province,
      city: user.city,
      locality: user.locality,
      phone: user.phone,
    };

    const options = {
      headers: headers,
    };

    return this.http.put<LoginResponse>(
      this.apiUrl + 'users',
      payload,
      options
    );
  }

  updatePassword(password: string, token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };

    return this.http.put<LoginResponse>(
      this.apiUrl + 'users/password',
      { password },
      options
    );
  }
}
