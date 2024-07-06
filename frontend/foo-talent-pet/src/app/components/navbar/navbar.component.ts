import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BtnLoginService } from '../../service/btn-login.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // constructor(private btnLoginService: BtnLoginService){}

  // openLogin(LoginContent:any){
  //   this.btnLoginService.openLogin(LoginContent);
  // }
}

