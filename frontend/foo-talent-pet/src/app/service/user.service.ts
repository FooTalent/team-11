import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../interfaces/interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers
    };

    return this.http.get<User>(this.apiUrl + 'users/me', options);
  }

  saveUser(user: User, token: string, profilePicture: File|null): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();

    formData.append('name', user.name || '');
    formData.append('country', user.country || '');
    formData.append('province', user.province || '');
    formData.append('city', user.city || '');
    formData.append('locality', user.locality || '');
    formData.append('phone', user.phone || '');
    if(profilePicture) {
      formData.append('profilePicture', profilePicture, profilePicture.name);
    }

    const options = {
      headers: headers
    };

    return this.http.put<LoginResponse>(this.apiUrl + 'users', formData, options);
  }

  updatePassword(password: string, token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers
    };

    return this.http.put<LoginResponse>(this.apiUrl + 'users/password', {password}, options);
  }

}
