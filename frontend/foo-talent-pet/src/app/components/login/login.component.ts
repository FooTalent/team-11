import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { PetQuestService } from '../../service/pet-quest.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  Validator,
} from '@angular/forms'
import { Login } from "../../interfaces/interfaces";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent, RegisterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);  

  userCredentials = new FormGroup({
    email: new FormControl('', Validators.required), // Asumiendo que ya tienes un campo de email
    password: new FormControl('', Validators.required) // Asegúrate de agregar el campo de contraseña
  })
  
    // credenciales = new FormGroup({
    //   nombreUsuario: new FormControl('', Validators.required),
    //   contrasenia: new FormControl('', Validators.required),
    // });
  constructor(private petQuestService: PetQuestService, ) {}

  clickLogin(){

    const userCredentialsTest = {
      email: "pirlo1121s@gmail.com",
      password: "12345"
    };
    console.log("clickLogin");
    console.log(this.userCredentials.value);
console.log(userCredentialsTest+"hola");

   if (typeof this.userCredentials.value.email === 'string' &&
    typeof this.userCredentials.value.password === 'string') {
      console.log('string');
       const credenciales: Login = {
      
      email:  this.userCredentials.value.email,
      password: this.userCredentials.value.password
    };
    console.log(credenciales);
    this.petQuestService.login(credenciales).subscribe((response: any) => {
    console.log(response);
    console.log('login');
    this.router.navigate(['/mascotas-perdidas']).then(() => {
      // Forzar la recarga de la página
      location.reload();
    });
   });
   
   } else {
    console.log('Error en las credenciales');
    
   }
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
