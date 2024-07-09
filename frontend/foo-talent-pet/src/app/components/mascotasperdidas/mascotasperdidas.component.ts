import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/lostpets.service';

@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css'
})
export class MascotasperdidasComponent {
  // todo: crear interfaz de pets
  pets: any;

  constructor(private LostService: LostpetsService) {}

  ngOnInit() {
    this.LostService.getHealth().subscribe(response => {
      this.pets = response;
      // console.log(this.pets);

    }, error => {
      console.error('Error fetching data', error);
    });
  }
}
