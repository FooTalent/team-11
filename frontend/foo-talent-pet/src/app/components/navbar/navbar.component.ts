import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from "../../service/user.service";
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
  token: string = ""
  verifyToken:boolean=false
  constructor(private store: Store<AppState>,private userService:UserService) {}

  credentials: LoginResponse|undefined;
  

  ngOnInit() {
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
        this.credentials = response;
  });
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    this.verifyToken=true
    console.log(token)
    console.log(this.verifyToken)
    if (!token) {
      console.log("no esxiste token")
      this.verifyToken= false
      return;
    }
  }
  }

  logOut(){
    localStorage.removeItem('token')
    this.store.dispatch(logOut());
    this.credentials = undefined;
   this.verifyToken = false
  }

  ClickProfile(){
    this.router.navigate(['/info']) 
    
  }

  VerifyToken(){
    if (this.token==="") {
      
    }
  }

  


}

