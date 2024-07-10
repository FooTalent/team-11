import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bienvenida-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './bienvenida-dashboard.component.html',
  styleUrl: './bienvenida-dashboard.component.css'
})
export class BienvenidaDashboardComponent {

}
