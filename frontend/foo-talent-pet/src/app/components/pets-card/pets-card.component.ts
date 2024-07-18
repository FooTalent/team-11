import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PetResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-pets-card',
  standalone: true,
  imports: [],
  templateUrl: './pets-card.component.html',
  styleUrl: './pets-card.component.css'
})
export class PetsCardComponent {
  @Input() pet: PetResponse = {
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

  constructor(private router: Router) { }

  viewPet(pet: any) {
    this.router.navigate(['pets-details', pet.id], { state: { pet: pet } });
    // console.log(pet)
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

}
