import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = 'https://notable-viva-adriansft-15c2b044.koyeb.app/api/auth/login';

  constructor(private http: HttpClient) { }

  login(payload:any): Observable<any> {
	return this.http.post(this.baseUrl, payload);
  }
}