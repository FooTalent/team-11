import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { EventEmitter } from 'node:stream';
// ngrx bullshit
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Filters, LoginResponse } from '../../interfaces/interfaces';
import { select } from '@ngrx/store';
@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FiltroperdidasComponent,
    PetsCardComponent,
    CommonModule,
  ],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css',
})
export class MascotasperdidasComponent implements OnInit {
  // todo: crear interfaz de pets
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

  constructor(
    private LostService: LostpetsService,
    private store: Store<AppState>
  ) {}

  receiveFilters(filters: Filters) {
    this.appliedFilters = filters;
    this.getPets();
  }

  getPets(){
    this.LostService.getPets('LOST',this.appliedFilters, this.order).subscribe({
      next: (response) => {
        this.pets = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completado');
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

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
