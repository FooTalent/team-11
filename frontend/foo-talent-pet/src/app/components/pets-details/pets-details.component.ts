import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetsCardComponent } from '../pets-card/pets-card.component';


@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterLink, PetsCardComponent],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css'
})
export class PetsDetailsComponent  implements OnInit{

  pet: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pet = history.state.pet;
    console.log(this.pet); // Aquí tendrás los datos de la mascota
  }
}
