import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class LostpetsService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getHealth(): Observable<any> {
    return this.http.get<any>((`${this.apiUrl}posts/LOST?recent=true`));
  }

}
