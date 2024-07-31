import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ToggleOpcionesComponent } from '../toggle-opciones/toggle-opciones.component';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  Validator,
} from '@angular/forms'
import { SaludoDasboardComponent } from '../saludo-dasboard/saludo-dasboard.component';


@Component({
  selector: 'app-preferencias-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule,ToggleOpcionesComponent, ReactiveFormsModule, FormsModule, SaludoDasboardComponent],
  templateUrl: './preferencias-dashboard.component.html',
  styleUrl: './preferencias-dashboard.component.css'
})
export class PreferenciasDashboardComponent {

  metodoContacto = new FormGroup({
    email: new FormControl('', Validators.required), 
    telefono: new FormControl('', Validators.required) 
  })

  constructor(){}

  estado = false;

  mostrarOpciones(event: Event){
    const inputElement = event.target as HTMLInputElement;
    if((inputElement.checked)){
      console.log("se activó")
    } else {
      console.log("se desactivó")
    }
  }

}
