import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreferenciasDashboardComponent } from './components/preferencias-dashboard/preferencias-dashboard.component';
import { ToggleOpcionesComponent } from './components/toggle-opciones/toggle-opciones.component';
import { SwitchService } from './service/switch.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PreferenciasDashboardComponent, ToggleOpcionesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[SwitchService]
})
export class AppComponent {
  isComponentVisible$: Observable<boolean>;


  constructor(private switchService: SwitchService){
    this.isComponentVisible$ = this.switchService.visibility$
  }
  title = 'foo-talent-pet';
}
