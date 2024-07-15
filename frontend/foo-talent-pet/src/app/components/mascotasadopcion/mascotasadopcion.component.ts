import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { CommonModule } from '@angular/common';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { AdoptionpetService } from '../../service/posts/adoptionpet.service';


@Component({
  selector: 'app-mascotasadopcion',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, CommonModule, PetsCardComponent],
  templateUrl: './mascotasadopcion.component.html',
  styleUrl: './mascotasadopcion.component.css'
})
export class MascotasadopcionComponent {
  pets: any;

  constructor(private adoptionServices: AdoptionpetService) {}

  ngOnInit() {
    this.adoptionServices.getHealth().subscribe({
      next: (response) => {
        this.pets = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completado');
      },
    });
  }
}
