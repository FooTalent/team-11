import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { FoundpetsService } from '../../service/foundpets.service';

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasencontradas.component.html',
  styleUrl: './mascotasencontradas.component.css'
})
export class MascotasencontradasComponent {

  pets: any;

  constructor(private foundServices: FoundpetsService) {}

  ngOnInit() {
    this.foundServices.getHealth().subscribe(response => {
      this.pets = response;
      console.log(this.pets);

    }, error => {
      console.error('Error fetching data', error);
    });
  }
}
