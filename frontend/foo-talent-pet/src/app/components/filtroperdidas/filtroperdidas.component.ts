import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Color, Filters, Location, Tag } from '../../interfaces/interfaces';
import { ColorService } from '../../service/color.service';
import { LocationService } from '../../service/location.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagService } from '../../service/tags.service';
import { RouterLink } from '@angular/router';
import { LoginResponse } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { select } from '@ngrx/store';
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
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './filtroperdidas.component.html',
  styleUrl: './filtroperdidas.component.css',
})
export class FiltroperdidasComponent {

  credentials: LoginResponse|undefined;
  router = inject(Router);



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
    animal: '',
    gender: '',
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
    private locationService: LocationService,
    private store: Store<AppState>
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
    let date = this.filters.date ? new Date(this.filters.date).toISOString() : null;

    this.selectedColors = this.colors
      .filter((color) => color.selected)
      .map((color) => color.id);

    this.selectedTags = this.tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.id);

    this.filters.date = date;
    this.filters.province = this.selectedProvince;
    this.filters.city = this.selectedCity;
    this.filters.locality = this.selectedLocality;
    this.filters.colors = this.selectedColors;
    this.filters.tags = this.selectedTags;

    this.filtersApplied.emit(this.filters);

  }

  deleteFilters() {
    this.filters = {
      animal: '',
      gender: '',
      province: null,
      city: null,
      locality: null,
      date: null,
      colors: null,
      tags: null,
    };
    this.selectedProvince = '';
    this.selectedCity = '';
    this.selectedLocality = '';
    this.colors.forEach((color) => (color.selected = false));
    this.tags.forEach((tag) => (tag.selected = false));
    this.selectedColors = [];
    this.selectedTags = [];

    this.filtersApplied.emit(this.filters);
  }

  toggleColorsDropdown() {
    this.isColorsDropdownVisible = !this.isColorsDropdownVisible;
  }

  toggleTagsDropdown() {
    this.isTagsDropdownVisible = !this.isTagsDropdownVisible;
  }

  ngOnInit(): void {
    this.getPronvinces();
    this.getColors();
    this.getTags();

    console.log(this.credentials)
    console.log(this.store)
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
        this.credentials = response;
  });



  }

}
