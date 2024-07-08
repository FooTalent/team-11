import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostpetsService {
  private apiUrl = 'https://notable-viva-adriansft-15c2b044.koyeb.app/api/posts/LOST';

  constructor(private http: HttpClient) { }

  getHealth(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
