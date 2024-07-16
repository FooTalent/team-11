import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = 'https://pet-quest.azurewebsites.net/api/auth/login';

  constructor(private http: HttpClient) { }

  login(payload:any){
	return this.http.post(this.baseUrl, payload);
  }
}
