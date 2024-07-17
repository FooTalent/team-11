import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FiltroperdidasComponent } from '../filtroperdidas/filtroperdidas.component';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { FoundpetsService } from '../../service/posts/foundpets.service';

@Component({
  selector: 'app-mascotasencontradas',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,FiltroperdidasComponent, PetsCardComponent, CommonModule],
  templateUrl: './mascotasencontradas.component.html',
  styleUrl: './mascotasencontradas.component.css'
})
export class MascotasencontradasComponent implements OnInit{
  appliedFilters: any;
  pets: any;

  constructor(private foundServices: FoundpetsService) {}

  receiveFilters(filters: any) {
    this.appliedFilters = filters;
    console.log('Filtros aplicados:', this.appliedFilters);
  }


  ngOnInit() {
    this.foundServices.getHealth().subscribe({
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
}
