import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PetQuestService } from '../../services/pet-quest.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
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
