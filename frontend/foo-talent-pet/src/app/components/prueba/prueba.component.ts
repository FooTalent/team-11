import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPreguntaComponent } from '../modal-pregunta/modal-pregunta.component';


@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [ CommonModule, ModalPreguntaComponent ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

  constructor(){

  }


}
