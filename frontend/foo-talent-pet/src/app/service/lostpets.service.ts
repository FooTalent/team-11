import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LostpetsService {

  // private apiUrl = 'https://notable-viva-adriansft-15c2b044.koyeb.app/api/posts/LOST';

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getHealth(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"posts/LOST?recent=true");
  }

}
