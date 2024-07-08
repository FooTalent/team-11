import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { CommonModule } from '@angular/common';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { AdoptionpetService } from '../../service/adoptionpet.service';

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
    this.adoptionServices.getHealth().subscribe(response => {
      this.pets = response;
      console.log(this.pets);

    }, error => {
      console.error('Error fetching data', error);
    });
  }

}
