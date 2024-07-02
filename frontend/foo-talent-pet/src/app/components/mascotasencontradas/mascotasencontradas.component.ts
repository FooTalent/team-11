import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './mascotasencontradas.component.html',
  styleUrl: './mascotasencontradas.component.css'
})
export class MascotasencontradasComponent {

}
