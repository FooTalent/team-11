import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//ngrx bullshit
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from "../../interfaces/interfaces";
import { select } from '@ngrx/store';
import { logIn,logOut } from "../../store/tasks.actions";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,LoginComponent, ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router); 
  constructor(private store: Store<AppState>) {}

  credentials: LoginResponse|undefined;

  ngOnInit() {
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
        this.credentials = response;
  });
  }

  logOut(){
    this.store.dispatch(logOut());
    this.credentials = undefined;
  }

  ClickProfile(){
    this.router.navigate(['/info']) 
  }

}

