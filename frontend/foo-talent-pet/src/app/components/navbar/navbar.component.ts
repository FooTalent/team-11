import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../interfaces/interfaces';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from '../../interfaces/interfaces';
import { select } from '@ngrx/store';
import { logIn, logOut } from '../../store/tasks.actions';
import { get } from 'http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  token: string = '';
  verifyToken: boolean = false;
  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  credentials: LoginResponse | undefined;
  user: User | undefined;

  ngOnInit() {
    this.getUser();

    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
      this.credentials = response;
    });
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.verifyToken = true;
      if (!token) {
        this.verifyToken = false;
        return;
      }
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(logOut());
    this.credentials = undefined;
    this.verifyToken = false;
  }

  ClickProfile() {
    this.router.navigate(['/info']);
  }

  VerifyToken() {
    if (this.token === '') {
    }
  }

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (!user) {
        return;
      }
      this.user = JSON.parse(user);
    }
  }
}
