import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = environment.apiUrl+'auth/login';
  private baseUrl1 = environment.apiUrl+'posts';
  private token = "1";
  private headers = new HttpHeaders({


    'Authorization': `Bearer ${this.token}`
  });
 
  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  login(payload:any){
	return this.http.post(this.baseUrl, payload);
  }


  PostPet(payload:any,token:string){
    return this.http.post(this.baseUrl1, payload,this.options);
  }
}
