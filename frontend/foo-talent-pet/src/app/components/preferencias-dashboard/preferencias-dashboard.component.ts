import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SwitchService } from '../../service/switch.service';


@Component({
  selector: 'app-preferencias-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './preferencias-dashboard.component.html',
  styleUrl: './preferencias-dashboard.component.css'
})
export class PreferenciasDashboardComponent {
  constructor(private switchService: SwitchService){}

  toggleComponent(){
    this.switchService.toggleVisibility();
  }
}
