import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  openSlidebar() {
    LoginComponent.isVisible = true; 
  }
  
   closeSlidebar() {
    
  }
}

