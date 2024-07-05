import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from "@angular/router";
import { PetQuestService } from '../../service/pet-quest.service';
import { OnInit } from '@angular/core';
import { LandingTestimonialComponent } from "../landing-testimonial/landing-testimonial.component";
import { LandingAboutusComponent } from '../landing-aboutus/landing-aboutus.component';
<<<<<<< Updated upstream
import { LandingEncuentraComponent } from '../landing-encuentra/landing-encuentra.component';
import { LandingUneteComponent } from '../landing-unete/landing-unete.component';
import { LandingComofuncionaComponent } from "../landing-comofunciona/landing-comofunciona.component";
=======
import { LandingComofuncionaComponent } from '../landing-comofunciona/landing-comofunciona.component';
import { LandingEncuentraComponent } from '../landing-encuentra/landing-encuentra.component';

>>>>>>> Stashed changes

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< Updated upstream
  imports: [NavbarComponent, FooterComponent, RouterLink,LandingTestimonialComponent,LandingAboutusComponent, LandingEncuentraComponent,LandingComofuncionaComponent,LandingUneteComponent],
=======
  imports: [NavbarComponent, FooterComponent, RouterLink, LandingTestimonialComponent, LandingAboutusComponent, LandingEncuentraComponent, LandingComofuncionaComponent],
>>>>>>> Stashed changes
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
