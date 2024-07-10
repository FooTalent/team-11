import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { PetQuestService } from '../../service/pet-quest.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent, RegisterComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  

  constructor(private petQuestService: PetQuestService) {}
  clickLogin(){
    const userCredentials = {
      email: "pirlo1121s@gmail.com",
      password: "12345"
    };
    console.log('login');
    this.petQuestService.login(userCredentials).subscribe((response: any) => {
    console.log(response);
   });
  }

oninit(){
  
   
   
}
  // openModal(content:any){
  //   this.btnLoginService.openLogin(content);
  // }

  // close(){
  //   this.btnLoginService.closeLogin();
  // } 
}
