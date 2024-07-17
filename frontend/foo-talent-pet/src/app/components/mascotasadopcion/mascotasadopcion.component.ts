import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { CommonModule } from '@angular/common';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { AdoptionpetService } from '../../service/posts/adoptionpet.service';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { Filters } from '../../interfaces/interfaces';


@Component({
  selector: 'app-mascotasadopcion',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, CommonModule, PetsCardComponent],
  templateUrl: './mascotasadopcion.component.html',
  styleUrl: './mascotasadopcion.component.css'
})
export class MascotasadopcionComponent {
  appliedFilters: Filters = {
    animal: null,
    gender: null,
    province: null,
    city: null,
    locality: null,
    date: null,
    colors: null,
    tags: null,
  };

  pets: any;
  order: boolean = true;

  constructor(private lostService: LostpetsService) {}

  receiveFilters(filters: any) {
    this.appliedFilters = filters;
    this.getPets();
  }


  getPets() {
    this.lostService.getPets('ADOPTION', this.appliedFilters, this.order).subscribe(
      {
        next: (response) => {
          this.pets = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Observable completado');
        },
      }
    );
  }

  onOrderChange(order: boolean) {
    if(this.order === order) return;
    this.order = order;
    this.getPets();
  }

  ngOnInit() {
    this.getPets();
  }
}
