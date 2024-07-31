import { Component,inject,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
//ngrx bullshit
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { LoginResponse } from "../../interfaces/interfaces";
import { select } from '@ngrx/store';
import { logIn,logOut } from "../../store/tasks.actions";

@Component({
  selector: 'app-landing-encuentra',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-encuentra.component.html',
  styleUrl: './landing-encuentra.component.css'
})
export class LandingEncuentraComponent implements OnInit {

  token: string = ""
  auth:boolean = false;
  credentials: LoginResponse|undefined;
  router = inject(Router);
  constructor(private store: Store<AppState>) {}

 ngOnInit(): void {
       console.log(this.credentials)
    console.log(this.store)
    this.token = localStorage.getItem('token') ?? '';
    if(this.token){
      this.auth = true;
    }else{
      this.auth = false;
    }
    this.store.pipe(select('loggedIn')).subscribe((response: LoginResponse) => {
        this.credentials = response;
  });
}

  //routing(){
  //   console.log(this.credentials)
  //   this.router.navigate(['/form-publication'])
  // }


}
