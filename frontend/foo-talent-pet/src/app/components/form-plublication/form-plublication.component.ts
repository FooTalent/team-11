import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MascotasadopcionComponent } from '../mascotasadopcion/mascotasadopcion.component';
import { MascotasencontradasComponent } from '../mascotasencontradas/mascotasencontradas.component';
import { MascotasperdidasComponent } from '../mascotasperdidas/mascotasperdidas.component';
import { ModalPreguntaComponent } from '../modal-pregunta/modal-pregunta.component';
import { ConfirmacionService } from '../../service/confirmacion.service';
import Swal from 'sweetalert2';
import { Pet } from "../../interfaces/interfaces";
import { LocationService } from '../../service/location.service';
import { PetQuestService } from "../../service/pet-quest.service";
//ngrx bullshit
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from "../../interfaces/interfaces";
import { select } from '@ngrx/store';
import { logIn,logOut } from "../../store/tasks.actions";
import { from } from 'rxjs';


@Component({
  selector: 'app-form-plublication',
  standalone: true,
  imports: [
    NavbarComponent, 
    FooterComponent, 
    RouterLink, 
    MascotasadopcionComponent, 
    MascotasencontradasComponent, 
    MascotasperdidasComponent,
    ModalPreguntaComponent,
    FormsModule
    
    
  ],
  templateUrl: './form-plublication.component.html',
  styleUrl: './form-plublication.component.css'
})
export class FormPlublicationComponent  {

 provincia: string = "";
  city: string = "";
  localidad: string = "";
provincias : any;
ciudades: any;
localidades: any;
value: any;
colors: any;
tags: any;


  constructor(private store: Store<AppState>,private locationService: LocationService,private petquestService:PetQuestService ) {}
 
    pet:Pet = {
    id: "",
    name: "",
    description: "",
    date: "",
    status: "",
    speciesType: "",
    gender: "",
    province: "",
    city: "",
    locality: "",
    contact: "",
    createdAt: "",
    user: {
      id: "",
      email: "",
      name: "",
      country: "",
      province: "",
      city: "",
      phone: "",
      locality: "",
      profilePicture: ""
    }, 
    tags: [], 
    colors: [], 
    images: []
  };


  // private _confirmacionService = inject(ConfirmacionService);

  credentials: LoginResponse|undefined;

  ngOnInit() {
    
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
        this.credentials = response;
  });

  //service location
  this.locationService.getProvinces().subscribe((response: any) => {
    this.provincias = response;
  });

  //service colors
  this.locationService.getColors().subscribe((response: any) => {
    this.colors = response;
  });

  //service tags
  this.locationService.getTags().subscribe((response: any) => {
    this.tags = response;
  });
  }
  public cargarConfirmacion():void{
    Swal.fire({
      title: "Ya casi....",
      text: "¿Querés subir la publicación? ",
      showCancelButton: true,
      confirmButtonColor: "#feb941",
      cancelButtonColor: "#fde49d",
      confirmButtonText: "Si, publicar",
      cancelButtonText: "No, cancelar" ,
      background: "#B8E4E9",
      customClass:{
        popup: 'custom-popup',
        cancelButton: 'cancelBtn-pop',
        confirmButton: 'confirmBtn-pop',
      }
        
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.credentials?.token) {
          this.petquestService.PostPet(this.pet,this.credentials.token).subscribe({
            next: (response) => {
              console.log('Función correctamente', response);
            },
            error: (error) => {
              console.error('Error al enviar el formulario', error);
            },
            complete: () => {
              console.log('Envío del formulario completado');
            }
          })
        }
     
        Swal.fire({
          title: "Genial",
          background: "#B8E4E9",
          html: '<p>Tu publicación se ha subido con éxito</p> <img src="../../assets/grupo-animales-lindos-sobre-fondo-blanco 2.png" alt="imagen-alert" style="width: 400; height: auto">',
          timer: 3000,
          customClass:{
            popup: 'custom-popup-if',
            title: 'titulo-pop',
            image: 'img-pop'
          },
          showConfirmButton: false,
        });
        
      }
    });
    
  
  }
  
  onProvinciaChange(event: any) {
    console.log(this.provincias);
    const selectedProvincia = event.target.value;
    this.locationService.getCities(selectedProvincia).subscribe((response: any) => {
      this.ciudades = response;
    });
  this.provincia = event.target.value;
   console.log(this.ciudades);
  }

  onCityChange(event: any) {
this.locationService.getLocalities(event.target.value).subscribe((response: any) => {
  this.localidades = response;
  this.city = event.target.value;
  })
}
onLocalidadChange(event: any) {
  console.log(event.target.value);  
  this.localidad= event.target.value;

  this.pet.province = this.provincia;
  this.pet.city = this.city;
  this.pet.locality = this.localidad;
  console.log(this.pet);

}

fillColorArray(color: any) {
  
   this.pet.colors.push(color);
  

}
fillTagsArray(tag: any) {
  this.pet.tags.push(tag);
}

PostPet(){
  console.log(this.pet);
}

 test(){

   console.log(this.pet);
 }

 
}
