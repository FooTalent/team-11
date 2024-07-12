import { Component, OnInit } from '@angular/core';
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
  
  
  constructor(private petQuestService: PetQuestService, ) {}

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

  register=true
  cerrar=false
  redireccion=true

  clickRegister(){
    this.register = !this.register
    console.log(this.register)
  }

  cerrarTodo(){
    this.cerrar = this.cerrar
    if(this.cerrar == false){
      this.clickRegister();
    }
    console.log(this.register)
  }
  redireccionLogin(){
    this.redireccion==this.redireccion
    if(this.redireccion==true){
      this.clickRegister();
    }
  }

oninit(){
   
}



// ngOnInit() {
//   this.modalLoginService.modalState$.subscribe(state => {
//     this.isOpen = state;
//   });
// }

// closeModal() {
//   this.modalLoginService.close();
// }
//   isOpen = false;


  
}
