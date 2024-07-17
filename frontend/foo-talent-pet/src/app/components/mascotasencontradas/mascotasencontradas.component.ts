import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { Filters } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FiltroperdidasComponent,
    PetsCardComponent,
    CommonModule,
  ],
  templateUrl: './mascotasencontradas.component.html',
  styleUrl: './mascotasencontradas.component.css',
})
export class MascotasencontradasComponent implements OnInit {
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
    this.lostService.getPets('FOUND', this.appliedFilters, this.order).subscribe(
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
