import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing-unete',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './landing-unete.component.html',
  styleUrl: './landing-unete.component.css'
})
export class LandingUneteComponent {
  constructor(private router: Router){}
  register: boolean = false

  clickRegister(){
    this.router.navigate(['/login']);
    this.register = false



  }

}
