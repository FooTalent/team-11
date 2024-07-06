import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css'
})
export class MascotasperdidasComponent {

  // esto es mientras nos dan la api:
  pets = [
    { name: 'Perro', age: 4 },
    { name: 'Gato', age: 2 },
    { name: 'Pájaro', age: 1 },
    { name: 'salmon', age: 1 },
    { name: 'delfin', age: 1 }
  ];

}
