import { Component, Output, EventEmitter } from '@angular/core';
import { Color, Filters, Location, Tag } from '../../interfaces/interfaces';
import { ColorService } from '../../service/color.service';
import { LocationService } from '../../service/location.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagService } from '../../service/tags.service';
// import { EventEmitter } from 'node:stream';

interface ColorSelected extends Color {
  selected: boolean;
}
interface TagSelected extends Tag {
  selected: boolean;
}

@Component({
  selector: 'app-filtroperdidas',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
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
  selectedColors: string[] = [];
  selectedTags: string[] = [];

  colors: ColorSelected[] = [];
  tags: TagSelected[] = [];

  isColorsDropdownVisible: boolean = false;
  isTagsDropdownVisible: boolean = false

  filters: Filters = {
    animal: null,
    gender: null,
    province: null,
    city: null,
    locality: null,
    date: null,
    colors: null,
    tags: null,
  };

  @Output() filtersApplied = new EventEmitter<any>();

  constructor(
    private colorService: ColorService,
    private tagService: TagService,
    private locationService: LocationService
  ) {}

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
      this.colors = colors.map((color) => {
        return { ...color, selected: false };
      });
    });
  }

  getTags() {
    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags.map((tag) => {
        return { ...tag, selected: false };
      });
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

    this.selectedColors = this.colors
      .filter((color) => color.selected)
      .map((color) => color.id);

    this.selectedTags = this.tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.id);

    this.filters = {
      animal,
      gender: genero,
      province: provincia,
      city: ciudad,
      locality: localidad,
      date: date,
      colors: this.selectedColors,
      tags: this.selectedTags,
    };

    this.filtersApplied.emit(this.filters);
  }

  deleteFilters() {
    this.filters = {
      animal: null,
      gender: null,
      province: null,
      city: null,
      locality: null,
      date: null,
      colors: null,
      tags: null,
    };

    this.filtersApplied.emit(this.filters);
  }

  toggleColorsDropdown() {
    this.isColorsDropdownVisible = !this.isColorsDropdownVisible;
  }

  toggleTagsDropdown() {
    this.isTagsDropdownVisible = !this.isTagsDropdownVisible;
  }

  ngOnInit() {
    this.getPronvinces();
    this.getColors();
    this.getTags();
  }
}
