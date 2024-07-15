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
import { LoginResponse } from "../../interfaces/interfaces";
import { select } from '@ngrx/store';
@Component({
  selector: 'app-mascotasperdidas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasperdidas.component.html',
  styleUrl: './mascotasperdidas.component.css'
})
export class MascotasperdidasComponent implements OnInit{
  // todo: crear interfaz de pets
  appliedFilters: any;
  pets: any;

  constructor(private LostService: LostpetsService,private store: Store<AppState>) {}

  receiveFilters(filters: any) {
    this.appliedFilters = filters;
    // Aquí puedes hacer lo que necesites con los filtros aplicados
    console.log('Filtros aplicados:', this.appliedFilters);
  }

  ngOnInit() {


    //ngrx bullshit
   

    this.LostService.getHealth().subscribe({
      next: (response) => {
        // console.time()
        this.pets = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completado');
        // console.timeEnd()
      },
    });
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
