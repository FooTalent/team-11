import { Component, Output, EventEmitter } from '@angular/core';
import { Color, Filters, Location, Tag } from '../../interfaces/interfaces';
import { ColorService } from '../../service/color.service';
import { LocationService } from '../../service/location.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-filtroperdidas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filtroperdidas.component.html',
  styleUrl: './filtroperdidas.component.css',
})
export class FiltroperdidasComponent {
  provinces: Location[] = [];
  cities: Location[] = [];
  localities: Location[] = [];

  selectedProvince: string = '';
  selectedCity: string = '';
  selectedLocality: string = '';

  colors: Color[] = [];
  tags: Tag[] = [];

  @Output() filtersApplied = new EventEmitter<any>();

  constructor(private colorService: ColorService, private locationService: LocationService) {}

  getPronvinces() {
    this.locationService.getProvinces().subscribe((provinces) => {
      this.provinces = provinces;
    });
  }

  getCities(selectedProvince: string) {
    this.locationService.getCities(selectedProvince).subscribe((cities) => {
      this.cities = cities;
    });
  }

  getLocalities(selectedCity: string) {
    this.locationService.getLocalities(selectedCity).subscribe((localities) => {
      this.localities = localities;
    });
  }


  getColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
    });
  }

  getTags() {
    this.colorService.getColors().subscribe((tags) => {
      this.tags = tags;
    });
  }

  applyFilters() {
    const animal = (document.getElementById('animal') as HTMLSelectElement)
      .value;
    const genero = (document.getElementById('genero') as HTMLSelectElement)
      .value;
    const provincia = (
      document.getElementById('provincia') as HTMLSelectElement
    ).value;
    const ciudad = (document.getElementById('ciudad') as HTMLSelectElement)
      .value;
    const localidad = (
      document.getElementById('localidad') as HTMLSelectElement
    ).value;
    let fecha = (document.getElementById('fecha') as HTMLSelectElement).value;
    //const colors = (document.getElementById('color') as HTMLSelectElement).value;

    let date = fecha ? new Date(fecha).toISOString() : null;
    console.log(date)
    const filters: Filters = {
      animal,
      gender: genero,
      province: provincia,
      city: ciudad,
      locality: localidad,
      date: date,
      colors: null,
      tags: null,
    };

    this.filtersApplied.emit(filters);
  }

  ngOnInit() {
    this.getPronvinces();
    this.getColors();
    this.getTags();
  }
}
