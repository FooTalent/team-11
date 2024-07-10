import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SwitchService } from '../../service/switch.service';
import { ToggleOpcionesComponent } from '../toggle-opciones/toggle-opciones.component';


@Component({
  selector: 'app-preferencias-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule,ToggleOpcionesComponent],
  templateUrl: './preferencias-dashboard.component.html',
  styleUrl: './preferencias-dashboard.component.css'
})
export class PreferenciasDashboardComponent {
  constructor(private switchService: SwitchService){}
 
   isComponentVisible: boolean = false;

   toggleComponentOpciones(event: any): void {
   
   
    console.log('Switch estado:', event.target.checked);
  }
  toggleComponent(){
    this.switchService.toggleVisibility();
  }
}
