import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { Filters } from '../../interfaces/interfaces';
import {  SpinerComponent} from "../spiner/spiner.component";

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FiltroperdidasComponent,
    PetsCardComponent,
    CommonModule,
    SpinerComponent,
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
  isLoading = false;
  pets: any;
  order: boolean = true;
    fechalabel: string = "encontrado"

  constructor(private lostService: LostpetsService) {}

  receiveFilters(filters: any) {
    this.appliedFilters = filters;
    this.getPets();
  }

  getPets() {
    this.isLoading = true;
    this.lostService.getPets('FOUND', this.appliedFilters, this.order).subscribe(
      {
        next: (response) => {
          this.isLoading = false;
          this.pets = response;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
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
