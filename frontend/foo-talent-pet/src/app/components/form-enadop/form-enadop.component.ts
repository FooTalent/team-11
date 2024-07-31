import { Component, inject ,Input} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink ,ActivatedRoute, Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MascotasadopcionComponent } from '../mascotasadopcion/mascotasadopcion.component';
import { MascotasencontradasComponent } from '../mascotasencontradas/mascotasencontradas.component';
import { MascotasperdidasComponent } from '../mascotasperdidas/mascotasperdidas.component';
import { ModalPreguntaComponent } from '../modal-pregunta/modal-pregunta.component';
import { ConfirmacionService } from '../../service/confirmacion.service';
import Swal from 'sweetalert2';
import { Pet ,PetResponse} from '../../interfaces/interfaces';
import { LocationService } from '../../service/location.service';
import { PetQuestService } from '../../service/pet-quest.service';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { SpinerComponent } from "../spiner/spiner.component";

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from '../../interfaces/interfaces';
import { select } from '@ngrx/store';
import { logIn, logOut } from '../../store/tasks.actions';
import { from } from 'rxjs';
import { CommonModule ,Location} from '@angular/common';
import { send } from 'node:process';

@Component({
  selector: 'app-form-enadop',
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
    CardEditComponent,
    SpinerComponent,

  ],
  templateUrl: './form-enadop.component.html',
  styleUrl: './form-enadop.component.css',
})
export class FormEnadopComponent {

  pet: PetResponse = {
    id: '',
    name: '',
    description: '',
    date: '',
    status: '',
    speciesType: '',
    gender: '',
    province: '',
    city: '',
    locality: '',
    contact: '',
    createdAt: '',
    user: {
      id: '',
      email: '',
      name: null,
      country: null,
      province: null,
      city: null,
      locality: null,
      phone: null,
      profilePicture: '',
    },
    tags: [],
    colors: [],
    images: [],
  };

  provincia = '';
  city = '';
  localidad = '';
  selectedSpecies: string = this.pet.speciesType||'';
  selectedGender: string = this.pet.gender || '';
  provincias: any;
  ciudades: any;
  localidades: any;
  value: any;
  colors: any;
  tags: any;
  isLoading = false;
  isButtonDog = false;
  isButtonFemale = false;
  isbuttonActive = false;
  isButtonMale = false;
  tagsPressed: { [key: string]: boolean } = {};
  colorPressed: { [key: string]: boolean } = {};

  comments: Comment[] = [];
  images: string[] = [];
  imagesFiles: File[] = [];

  credentials: LoginResponse = { token: '', user: { id: '', email: '', name: null, country: null, province: null, city: null, locality: null, phone: null, profilePicture: '' } };



  constructor(
    private store: Store<AppState>,
    private locationService: LocationService,
    private petQuestService: PetQuestService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {

  }

  ngOnInit() {

    this.pet = history.state.pet;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.getPet(id);

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

      
      this.selectedGender = this.pet.gender || '';
      this.selectedSpecies = this.pet.speciesType || '';

    });

    this.formatPetDate()
    this.initializeAndFillImages(this.pet.images);
  }

  getPet(id: string) {
    this.petQuestService.getPet(id).subscribe((pet) => {
      this.pet = pet.post;
    });
  }

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
;
  ButonGenderMale() {
    this.pet.gender = 'MASCULINO';
    this.isButtonMale = !this.isButtonMale;
    this.selectedGender = 'MASCULINO';
    this.pet.gender = 'MASCULINO'
  }

  ButonGenderFemale() {
    this.pet.gender = 'FEMENINO';
    this.selectedGender = 'FEMENINO';
  }
  ButonGenderOther() {}

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

  formatPetDate() {
    if (this.pet && this.pet.date) {
      const date = new Date(this.pet.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.pet.date= `${year}-${month}-${day}`;
    }

    if (this.pet && this.pet.colors) {
      this.pet.colors.forEach((color: any) => {
        this.colorPressed[color.name] = true;
      });
          }
    if (this.pet && this.pet.tags) {
      this.pet.tags.forEach((tag: any) => {
        this.tagsPressed[tag.name] = true;
      });}
    return '';
  }

  initializeAndFillImages(files: any[]): void {

  }

  UpdatePet() {
      console.log(this.credentials?.token);
      console.log(this.pet);
      const sendPet = {
        id: this.pet.id || '',
        name: this.pet.name || '',
        description: this.pet.description || '',
        date: this.pet.date || '',
        status: this.pet.status   || '',
        speciesType: this.pet.speciesType || '',
        gender: this.pet.gender || '',
        province: this.pet.province || '',
        city: this.pet.city || '',
        locality:this.pet.locality || '',
        contact: this.pet.contact   || '',
        createdAt: this.pet.createdAt || '',
        tags: this.pet.tags.map(tag => tag.id),
        colors: this.pet.colors.map(color => color.id),

      }
      this.isLoading = true; 
      this.petQuestService.UpdatePost(this.pet.id, sendPet, this.credentials?.token)
  .pipe()
  .subscribe({
    next: (response) => {

      console.log('Mascota actualizada con éxito:', response);
      this.isLoading = false;
    },
    error: (error) => {
      this.isLoading = false;
    console.error('Error al actualizar la mascota:', error);
    },
    complete: () => {
      this.isLoading = false;
      console.log('Operación de actualización completada');
      this.location.back();
    }
  });
      }



}
