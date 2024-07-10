import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../service/switch.service';

@Component({
  selector: 'app-modal-pregunta',
  standalone: true,
  imports: [],
  templateUrl: './modal-pregunta.component.html',
  styleUrl: './modal-pregunta.component.css'
})
export class ModalPreguntaComponent implements OnInit {

  // constructor(private modalSS: SwitchService){ }

  ngOnInit(): void {
    
  }

  // closeModal(){
  //   this.modalSS.$modal.emit(false)
  // }
}
