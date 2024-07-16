import { Component,inject} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ConfirmacionService } from '../../service/confirmacion.service';


@Component({
  selector: 'app-form-enadop',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './form-enadop.component.html',
  styleUrl: './form-enadop.component.css'
})
export class FormEnadopComponent {
  private _confirmacionService = inject(ConfirmacionService);


  public cargarConfirmacion():void{
    this._confirmacionService.mostrarConfirmacion();
  }

}
