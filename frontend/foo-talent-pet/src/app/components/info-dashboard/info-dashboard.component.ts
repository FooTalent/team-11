import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Location } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css',
})
export class InfoDashboardComponent {
  user: User = {
    id: '',
    email: '',
    name: '',
    country: '',
    province: '',
    city: '',
    locality: '',
    phone: '',
    profilePicture: '',
  };

  provinces: Location[] = [];
  cities: Location[] = [];
  localities: Location[] = [];

  selectedProvince: string = this.user.province || '';
  selectedCity: string = this.user.city || '';
  selectedLocality: string = this.user.locality || '';

  constructor(
    private userService: UserService,
    private locationService: LocationService
  ) {}

  getUser() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      this.userService.getUser(token).subscribe((data) => {
        this.user = {
          id: data.id || '',
          email: data.email || '',
          name: data.name || '',
          country: data.country || '',
          province: data.province || '',
          city: data.city || '',
          locality: data.locality || '',
          phone: data.phone || '',
          profilePicture: data.profilePicture || '',
        };
        if (data.province) {
          this.selectedProvince = data.province;
          this.getCities(this.selectedProvince);
          if (data.city) {
            this.selectedCity = data.city;
            this.getLocalities(this.selectedCity);
            if (data.locality) {
              this.selectedLocality = data.locality;
            }
          }
        }
      });
    }
  }

  getProvinces() {
    this.locationService.getProvinces().subscribe((data) => {
      this.provinces = data;
      if (this.user.province) {
        this.selectedProvince = this.user.province;
        this.getCities(this.selectedProvince);
      }
    });
  }

  getCities(province: string) {
    this.locationService.getCities(province).subscribe((data) => {
      this.cities = data;
    });
  }

  getLocalities(city: string) {
    this.locationService.getLocalities(city).subscribe((data) => {
      this.localities = data;
    });
  }

  saveUser() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      this.user.province = this.selectedProvince;
      this.user.city = this.selectedCity;
      this.user.locality = this.selectedLocality;

      this.userService.saveUser(this.user, token, null).subscribe((data) => {
        const newUser: User = data.user;
        this.user = {
          id: newUser.id || '',
          email: newUser.email || '',
          name: newUser.name || '',
          country: newUser.country || '',
          province: newUser.province || '',
          city: newUser.city || '',
          locality: newUser.locality || '',
          phone: newUser.phone || '',
          profilePicture: newUser.profilePicture || '',
        };

        const newToken = data.token;
        localStorage.setItem('token', newToken);
      });
    }
  }

  ngOnInit() {
    this.getUser();
    this.getProvinces();
  }
}
