import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { MascotasadopcionComponent } from '../mascotasadopcion/mascotasadopcion.component';
import { MascotasencontradasComponent } from '../mascotasencontradas/mascotasencontradas.component';
import { MascotasperdidasComponent } from '../mascotasperdidas/mascotasperdidas.component';

@Component({
  selector: 'app-form-plublication',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, MascotasadopcionComponent, MascotasencontradasComponent, MascotasperdidasComponent],
  templateUrl: './form-plublication.component.html',
  styleUrl: './form-plublication.component.css'
})
export class FormPlublicationComponent {

}
