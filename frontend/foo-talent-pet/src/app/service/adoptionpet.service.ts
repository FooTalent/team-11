import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionpetService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getHealth(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"posts/ADOPTION?recent=true");
  }
}
