import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasencontradas.component.html',
  styleUrl: './mascotasencontradas.component.css'
})
export class MascotasencontradasComponent {

  pets = [
    { name: 'Perro', age: 4 },
    { name: 'Gato', age: 2 },
    { name: 'Pájaro', age: 1 },
    { name: 'salmon', age: 1 },
    { name: 'delfin', age: 1 }
  ];
}
