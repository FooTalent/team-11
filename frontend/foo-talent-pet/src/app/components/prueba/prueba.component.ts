import { Component, OnInit} from '@angular/core';
import { ModalPreguntaComponent } from "../modal-pregunta/modal-pregunta.component";
import { CommonModule } from '@angular/common';
import { SwitchService } from '../../service/switch.service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [ModalPreguntaComponent, CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit{

  modalSwitch!: boolean;


  constructor(private modalSS: SwitchService){

  }


  ngOnInit(): void {
    
    // this.modalSS.$modal.subscribe((valor) => {
    //   this.modalSwitch = valor
    // });

  }


  openModal(){
    this.modalSwitch = true;
  }

}
