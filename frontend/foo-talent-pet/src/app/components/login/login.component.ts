import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
// import { BtnLoginService } from '../../service/btn-login.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  // constructor(private btnLoginService: BtnLoginService) {}
  
  // openModal(content:any){
  //   this.btnLoginService.openLogin(content);
  // }

  // close(){
  //   this.btnLoginService.closeLogin();
  // }
}
