import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from "@angular/router";
import { PetQuestService } from '../../service/pet-quest.service';
import { OnInit } from '@angular/core';
import { LandingTestimonialComponent } from "../landing-testimonial/landing-testimonial.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink,LandingTestimonialComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: any;

  
  constructor(private petQuestService: PetQuestService) { }


  //Agregar el método ngOnInit() que se encargará de obtener los datos de la API y mostrarlos en la consola.
// ngOnInit(): void {
//     this.petQuestService.getEndpointData('health').subscribe({
//       next: (data) => {
//         this.data = data;
//         console.log('Data:', data);
//       },
//       error: (error) => {
//         console.error('There was an error!', error);
//       }
//     });
//   }
}
