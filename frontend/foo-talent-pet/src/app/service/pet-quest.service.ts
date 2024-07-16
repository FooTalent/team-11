import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = 'https://alive-barby-adriansft-7f7abc1b.koyeb.app/api/auth/login';

  constructor(private http: HttpClient) { }

  login(payload:any){
	return this.http.post(this.baseUrl, payload);
  }
}
