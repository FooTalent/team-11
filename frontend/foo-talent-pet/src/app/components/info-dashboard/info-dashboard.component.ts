import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../interfaces/interfaces';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
  ],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css',
})
export class InfoDashboardComponent {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef('input');
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

  userPassword = new FormGroup({
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });

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

      this.userService.saveUser(this.user, token).subscribe((data) => {
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
        localStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }

  savePassword() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const password = this.userPassword.value.password;
      const rePassword = this.userPassword.value.rePassword;
      if (password !== rePassword) {
        return;
      }
      if (this.userPassword.value.password) {
        if (
          this.userPassword.value.password ===
            this.userPassword.value.rePassword &&
          this.userPassword.value.password.length >= 8
        ) {
          this.userService
            .updatePassword(this.userPassword.value.password, token)
            .subscribe((data) => {
              const newToken = data.token;
              localStorage.setItem('token', newToken);
              this.userPassword.reset();
            });
        }
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.saveProfilePicture(file);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  saveProfilePicture(profilePicture: File) {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.userService
      .updateProfilePicture(profilePicture, token)
      .subscribe((data) => {
        this.user = {
          ...this.user,
          profilePicture: data.profilePicture,
        };
        localStorage.setItem('user', JSON.stringify(this.user));
      });
  }

  ngOnInit() {
    this.getUser();
    this.getProvinces();
  }
}
