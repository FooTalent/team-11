import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { PetsCardComponent } from '../pets-card/pets-card.component';


@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterLink, PetsCardComponent],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css'
})
export class PetsDetailsComponent {

}
