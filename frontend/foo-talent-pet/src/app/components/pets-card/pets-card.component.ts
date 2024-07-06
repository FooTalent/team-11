import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pets-card',
  standalone: true,
  imports: [],
  templateUrl: './pets-card.component.html',
  styleUrl: './pets-card.component.css'
})
export class PetsCardComponent {
  @Input() pet: any;

}
