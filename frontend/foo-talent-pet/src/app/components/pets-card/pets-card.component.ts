import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-card',
  standalone: true,
  imports: [],
  templateUrl: './pets-card.component.html',
  styleUrl: './pets-card.component.css'
})
export class PetsCardComponent {
  @Input() pet: any;

  constructor(private router: Router) { }

  viewPet(pet: any) {
    this.router.navigate(['pets-details', pet.id], { state: { pet: pet } });
    // console.log(pet)
  }

}
