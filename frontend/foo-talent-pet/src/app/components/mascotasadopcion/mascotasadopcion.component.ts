import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { CommonModule } from '@angular/common';
import { PetsCardComponent } from '../pets-card/pets-card.component';

@Component({
  selector: 'app-mascotasadopcion',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, CommonModule, PetsCardComponent],
  templateUrl: './mascotasadopcion.component.html',
  styleUrl: './mascotasadopcion.component.css'
})
export class MascotasadopcionComponent {
  pets = [
    { name: 'Perro', age: 4 },
    { name: 'Gato', age: 2 },
    { name: 'Pájaro', age: 1 },
    { name: 'salmon', age: 1 },
    { name: 'delfin', age: 1 }
  ];

}
