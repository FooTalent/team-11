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
import { Pet } from '../../interfaces/interfaces';
import { LocationService } from '../../service/location.service';
import { PetQuestService } from '../../service/pet-quest.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from '../../interfaces/interfaces';
import { select } from '@ngrx/store';
import { logIn, logOut } from '../../store/tasks.actions';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-plublication.component.html',
  styleUrl: './form-plublication.component.css',
})
export class FormPlublicationComponent {
  provincia: string = '';
  city: string = '';
  localidad: string = '';
  provincias: any;
  ciudades: any;
  localidades: any;
  value: any;
  colors: any;
  tags: any;
  isbuttonActive: boolean = false;
  tagsPressed: { [key: string]: boolean } = {};
  colorPressed: { [key: string]: boolean } = {};

  constructor(
    private store: Store<AppState>,
    private locationService: LocationService,
    private petquestService: PetQuestService
  ) {}

  pet: Pet = {
    name: '',
    description: '',
    date: '',
    status: 'LOST',
    speciesType: '',
    gender: '',
    province: '',
    city: '',
    locality: '',
    contact: '',

    tags: [],
    colors: [],
    images: [],
  };

  images: string[] = [];
  imagesFiles: File[] = [];

  onFileSelected(event: any): void {
    const files = event.target.files;
    const filesToProcess = Array.from(files).slice(0, 3);
    this.images = [];
    this.imagesFiles = [];

    for (const file of filesToProcess) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file as Blob);
      this.imagesFiles.push(file as File);
    }
  }

  credentials: LoginResponse | undefined;

  ngOnInit() {
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
      this.credentials = response;
    });

    
    this.locationService.getProvinces().subscribe((response: any) => {
      this.provincias = response;
    });

    
    this.locationService.getColors().subscribe((response: any) => {
      this.colors = response;
    });

    
    this.locationService.getTags().subscribe((response: any) => {
      this.tags = response;
    });
  }
  public cargarConfirmacion(): void {
    Swal.fire({
      title: 'Ya casi....',
      text: '¿Querés subir la publicación? ',
      showCancelButton: true,
      confirmButtonColor: '#feb941',
      cancelButtonColor: '#fde49d',
      confirmButtonText: 'Si, publicar',
      cancelButtonText: 'No, cancelar',
      background: '#B8E4E9',
      customClass: {
        popup: 'custom-popup',
        cancelButton: 'cancelBtn-pop',
        confirmButton: 'confirmBtn-pop',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        if (token) {
          this.petquestService.PostPet(this.pet, token).subscribe({
            next: (response) => {
              console.log(response);
              this.petquestService
                .postImage(this.imagesFiles, response.id, token).subscribe();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              Swal.fire({
                title: 'Genial',
                background: '#B8E4E9',
                html: '<p>Tu publicación se ha subido con éxito</p> <img src="../../assets/grupo-animales-lindos-sobre-fondo-blanco 2.png" alt="imagen-alert" style="width: 400; height: auto">',
                timer: 3000,
                customClass: {
                  popup: 'custom-popup-if',
                  title: 'titulo-pop',
                  image: 'img-pop',
                },
                showConfirmButton: false,
              });
            },
          });
        }
      }
    });
  }

  onProvinciaChange(event: any) {
    const selectedProvincia = event.target.value;
    this.locationService
      .getCities(selectedProvincia)
      .subscribe((response: any) => {
        this.ciudades = response;
      });
    this.provincia = event.target.value;
  }

  onCityChange(event: any) {
    this.locationService
      .getLocalities(event.target.value)
      .subscribe((response: any) => {
        this.localidades = response;
        this.city = event.target.value;
      });
  }
  onLocalidadChange(event: any) {
    this.localidad = event.target.value;

    this.pet.province = this.provincia;
    this.pet.city = this.city;
    this.pet.locality = this.localidad;
  }

  fillColorArray(color: any) {
    this.pet.colors.push(color.id);
    this.colorPressed[color.name] = !this.colorPressed[color.name];
  }

  fillTagsArray(tag: any) {
    this.pet.tags.push(tag.id);
    this.tagsPressed[tag.name] = !this.tagsPressed[tag.name];
  }

  PostPet() {
    console.log(this.pet);
  }

  test() {
    console.log(this.credentials);
    console.log(this.credentials?.token);
    console.log(this.pet);
  }

  selectedSpecies: string = '';
  isButtonMale = false;
  selectedGender: string = '';

  ButonGenderMale() {
    this.pet.gender = 'MASCULINO';
    this.isButtonMale = !this.isButtonMale;
    this.selectedGender = 'MASCULINO';
  }
  isButtonFemale = false;
  ButonGenderFemale() {
    this.pet.gender = 'FEMENINO';
    this.selectedGender = 'FEMENINO';
  }
  ButonGenderOther() {}
  isButtonDog = false;
  butonSpeciesDog() {
    this.pet.speciesType = 'DOG';
    this.isButtonDog = !this.isButtonDog;
    this.selectedSpecies = 'DOG';
  }
  isButtonCat = false;
  butonSpeciesCat() {
    this.pet.speciesType = 'CAT';
    this.isButtonCat = !this.isButtonCat;
    this.selectedSpecies = 'CAT';
  }
  isButtonOther = false;
  butonSpeciesOther() {
    this.pet.speciesType = 'OTHER';
    this.isButtonOther = !this.isButtonOther;
    this.selectedSpecies = 'OTHER';
  }
}
