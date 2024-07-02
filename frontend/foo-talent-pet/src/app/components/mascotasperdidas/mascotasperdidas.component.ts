import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css'
})
export class MascotasperdidasComponent {

}
