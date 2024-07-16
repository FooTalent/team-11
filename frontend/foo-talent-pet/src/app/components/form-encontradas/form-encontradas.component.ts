import { Component,inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ConfirmacionService } from '../../service/confirmacion.service';

@Component({
  selector: 'app-form-encontradas',
  standalone: true,
  imports: [NavbarComponent,RouterLink, FooterComponent],
  templateUrl: './form-encontradas.component.html',
  styleUrl: './form-encontradas.component.css'
})
export class FormEncontradasComponent {
  private _confirmacionService = inject(ConfirmacionService);


  public cargarConfirmacion():void{
    this._confirmacionService.mostrarConfirmacion();
  }

}
