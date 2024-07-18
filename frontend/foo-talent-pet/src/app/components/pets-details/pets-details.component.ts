import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { PetResponse } from '../../interfaces/interfaces';
import { PetQuestService } from '../../service/pet-quest.service';

@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    PetsCardComponent,
    CommonModule,
  ],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css',
})
export class PetsDetailsComponent implements OnInit {
  btnReport: boolean = false;
  btnConfirmReport = false;

  reportComent() {
    this.btnReport = true;
    console.log('reporta comentario');
  }

  confirmReport() {
    this.btnConfirmReport = !this.btnConfirmReport;
    console.log('confirma reporte comentario');
  }

  pet: PetResponse = {
    id: '',
    name: '',
    description: '',
    date: '',
    status: '',
    speciesType: '',
    gender: '',
    province: '',
    city: '',
    locality: '',
    contact: '',
    createdAt: '',
    user: {
      id: '',
      email: '',
      name: null,
      country: null,
      province: null,
      city: null,
      locality: null,
      phone: null,
      profilePicture: '',
    },
    tags: [],
    colors: [],
    images: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petQuestService: PetQuestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.getPet(id);
  }

  getPet(id: string) {
    this.petQuestService.getPet(id).subscribe((pet) => {
      this.pet = pet.post;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }
}
