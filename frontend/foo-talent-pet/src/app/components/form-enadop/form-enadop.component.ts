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
//ngrx bullshit
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from '../../interfaces/interfaces';
import { select } from '@ngrx/store';
import { logIn, logOut } from '../../store/tasks.actions';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  }

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
    private petQuestService: PetQuestService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  
  comments: Comment[] = [];
  images: string[] = [];
  imagesFiles: File[] = [];

  // private _confirmacionService = inject(ConfirmacionService);

  credentials: LoginResponse | undefined;

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

  ngOnInit() {
    this.pet = history.state.pet;
    console.log(this.pet);
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.getPet(id);

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

  getPet(id: string) {
    this.petQuestService.getPet(id).subscribe((pet) => {
      this.pet = pet.post;
      console.log(this.pet);
      
    });
  }

  onProvinciaChange(event: any) {
    console.log(this.provincias);
    const selectedProvincia = event.target.value;
    this.locationService
      .getCities(selectedProvincia)
      .subscribe((response: any) => {
        this.ciudades = response;
      });
    this.provincia = event.target.value;
    console.log(this.ciudades);
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
    console.log(event.target.value);
    this.localidad = event.target.value;

    this.pet.province = this.provincia;
    this.pet.city = this.city;
    this.pet.locality = this.localidad;
    console.log(this.pet);
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
