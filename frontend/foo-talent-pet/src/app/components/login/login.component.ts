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
import { Login, registro,LoginResponse} from "../../interfaces/interfaces";
import { Router } from '@angular/router';
import { RegistroService } from '../../service/registro.service';
import { response } from 'express';
import Modal from 'bootstrap/js/dist/modal';
import { SpinerComponent } from "../spiner/spiner.component";
// ngrx bullshit
import { Store, select } from '@ngrx/store';
import { logIn,logOut } from "../../store/tasks.actions";
import { AppState } from "../../app.state";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent, RegisterComponent,CommonModule,ReactiveFormsModule,SpinerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);
  isLoading = false;
  userCredentials = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  userRegister = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required)
  })
    credentials: LoginResponse|undefined;

  constructor(private petQuestService: PetQuestService, private registroService: RegistroService,private store: Store<AppState>) {}

  Registrarse(){
    console.log("probando registro")
    console.log(this.userRegister.value)

    if(typeof this.userRegister.value.name === 'string' &&
      typeof this.userRegister.value.email === 'string' &&
      typeof this.userRegister.value.password === 'string' &&
      typeof this.userRegister.value.rePassword=== 'string'){
        const datos: registro = {
          name: this.userRegister.value.name,
          email: this.userRegister.value.email,
          password: this.userRegister.value.password,
          rePassword: this.userRegister.value.rePassword,
        }
        this.registroService.register(datos).subscribe((response: any) =>{
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: ' Por favor, Activa tu cuenta revisando tu correo.',
          });

        })
        console.log(datos)
      }

      else{
        Swal.fire({
          icon: 'error',
          title: 'Error de resgistro',
          text: ' Por favor, verifica tus credenciales.',
        });
        console.log("error de registro")
      }
  }

  clickLogin(){

   if (typeof this.userCredentials.value.email === 'string' &&
    typeof this.userCredentials.value.password === 'string') {

       const credenciales: Login = {

      email:  this.userCredentials.value.email,
      password: this.userCredentials.value.password
    };
    // console.log(credenciales);

    this.petQuestService.login(credenciales).pipe().subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido a FooTalent Pet',
      });
      this.store.dispatch(logIn({ loginResponse: response }));
      this.isLoading = false;
    },
    error: (error) => {
      this.isLoading = false;
      //poner pop up de error
      Swal.fire({
        icon: 'error',
        title: 'Error de login',
        text: 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.',
      });

    console.error('Error de login:', error);
    },
    complete: () => {
      this.isLoading = false;
      console.log('Operación de login completada');
      this.router.navigate(['/mascotas-perdidas']).then(() => { });
    }
  });
   } else {
    console.log('Error en las credenciales');
    //poner un pop up de error

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




test(){
  console.log('test');
// const miModal = new Modal(document.getElementsByClassName('modal-dialog')[0]);
  // const modalElement = document.getElementById('modal-test');
  // if (modalElement) {
  //   const miModal = new Modal(modalElement);
  //   miModal.hide();
  // }

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
