import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mascotasadopcion',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './mascotasadopcion.component.html',
  styleUrl: './mascotasadopcion.component.css'
})
export class MascotasadopcionComponent {

}
