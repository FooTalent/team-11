import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-form-encontradas',
  standalone: true,
  imports: [NavbarComponent,RouterLink, FooterComponent],
  templateUrl: './form-encontradas.component.html',
  styleUrl: './form-encontradas.component.css'
})
export class FormEncontradasComponent {

}
