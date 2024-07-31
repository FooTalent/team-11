import { Component,  OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { SpinerComponent } from '../spiner/spiner.component';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Filters } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FiltroperdidasComponent,
    PetsCardComponent,
    CommonModule,
    SpinerComponent,
  ],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css',
})
export class MascotasperdidasComponent implements OnInit {

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
  fechalabel: string = "Visto ultima vez"

  constructor(
    private LostService: LostpetsService,
    private store: Store<AppState>
  ) {}

  receiveFilters(filters: Filters) {
    this.appliedFilters = filters;
    this.getPets();
  }

  getPets(){
    this.isLoading=true;
    this.LostService.getPets('LOST',this.appliedFilters, this.order).subscribe({
      next: (response) => {
        this.pets = response;
        this.isLoading=false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading=false;
      },
      complete: () => {

        this.isLoading=false;
      },
    });
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
