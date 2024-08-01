import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActivateTokenService {

  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  activateAccount(token: string): void {
    const activationUrl = `${this.apiUrl}auth/activate/${token}`;

    this.http.post(activationUrl, {}).subscribe({
      next: (response) => {
        
        this.router.navigate(['/home']);
      },
      error: (error) => {
       
      },
      complete: () => {
      
      }
    });
  }
}
