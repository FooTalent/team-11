import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetQuestService } from '../../service/pet-quest.service';
import { Pet } from '../../interfaces/interfaces';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-toggle-opciones',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './toggle-opciones.component.html',
  styleUrl: './toggle-opciones.component.css'
})
export class ToggleOpcionesComponent {

  provincia: string = "";
  city: string = "";
  localidad: string = "";
  provincias : any;
  ciudades: any;
  localidades: any;
  value: any;
  colors: any;
  tags: any;
  isbuttonActive: boolean = false;
  tagsPressed: { [key: string]: boolean } = {};
  colorPressed: { [key: string]: boolean } = {};


  constructor(private petquestService: PetQuestService, private locationService: LocationService){}

  pet:Pet = {
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

    tags: [],
    colors: [],
    images: []
  };

  ngOnInit(){

    this.locationService.getProvinces().subscribe((response: any) => {
      this.provincias = response;
    });

    this.locationService.getTags().subscribe((response: any) => {
      this.tags = response;
    });

    this.locationService.getColors().subscribe((response: any) => {
      this.colors = response;
    });

  }

  fillColorArray(color: any) {
    this.pet.colors.push(color.id);
    this.colorPressed[color.name] = !this.colorPressed[color.name];
 }

 fillTagsArray(tag: any) {
   this.pet.tags.push(tag.id);
   this.tagsPressed[tag.name] = !this.tagsPressed[tag.name];
 }

 selectedSpecies: string = '';

 isButtonDog=false;
  butonSpeciesDog(){
    this.pet.speciesType = 'DOG';
    this.isButtonDog = !this.isButtonDog;
    this.selectedSpecies = 'DOG'
  };
isButtonCat=false;
  butonSpeciesCat(){
    this.pet.speciesType = 'CAT';
    this.isButtonCat = !this.isButtonCat;
    this.selectedSpecies = 'CAT'
  };
isButtonOther=false;
  butonSpeciesOther(){
    this.pet.speciesType = 'OTHER';
    this.isButtonOther = !this.isButtonOther
    this.selectedSpecies = 'OTHER'
  };

  selectedGender: string = '';
  isButtonMale=false;

  ButonGenderMale(){
    this.pet.gender = 'MASCULINO';
    this.isButtonMale = !this.isButtonMale;
    this.selectedGender = 'MASCULINO'

   }
   isButtonFemale=false;
    ButonGenderFemale(){
      this.pet.gender= 'FEMENINO';
      this.selectedGender = 'FEMENINO'
    }



    onProvinciaChange(event: any) {
      const selectedProvincia = event.target.value;
      this.locationService.getCities(selectedProvincia).subscribe((response: any) => {
        this.ciudades = response;
      });
    this.provincia = event.target.value;

    }

    onCityChange(event: any) {
      this.locationService.getLocalities(event.target.value).subscribe((response: any) => {
        this.localidades = response;
        this.city = event.target.value;
        })
      }

      onLocalidadChange(event: any) {

        this.localidad= event.target.value;

        this.pet.province = this.provincia;
        this.pet.city = this.city;
        this.pet.locality = this.localidad;


      }
}
