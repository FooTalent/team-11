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
    // private route: ActivatedRoute,
  ) { }

  activateAccount(token: string): void {

    this.http.post(this.apiUrl, { token: token }).subscribe(
      response => {
        console.log('Account activated successfully', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Activation error', error);
      }
    );
  }
}
