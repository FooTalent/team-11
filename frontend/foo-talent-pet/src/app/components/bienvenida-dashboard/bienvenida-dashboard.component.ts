import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { PetQuestService } from "../../service/pet-quest.service";
import { Filters, LoginResponse } from '../../interfaces/interfaces';
import {PetsCardComponent } from '../pets-card/pets-card.component';
import { CardEditComponent} from '../card-edit/card-edit.component';
import { SpinerComponent } from "../spiner/spiner.component";
import { SaludoDasboardComponent } from '../saludo-dasboard/saludo-dasboard.component';


@Component({
  selector: 'app-bienvenida-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule,PetsCardComponent,CardEditComponent,SpinerComponent, SaludoDasboardComponent],
  templateUrl: './bienvenida-dashboard.component.html',
  styleUrl: './bienvenida-dashboard.component.css'
})
export class BienvenidaDashboardComponent implements OnInit {
  isLoading = false;
  appliedFilters: Filters = {
    animal: null,
    gender: null,
    province: null,
    city: null,
    locality: null,
    date: null,
    colors: null,
    tags: null,
  };
  pets: any;
  order: boolean = true;
  userPosts: any;
  constructor(private LostService: LostpetsService,private petquestservice: PetQuestService) {}

  getPets(){
    this.LostService.getPets('LOST',this.appliedFilters, this.order).subscribe({
      next: (response) => {
        this.pets = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completado');
      },
    });
  }

  onOrderChange(order: boolean) {
    if(this.order === order) return;
    this.order = order;
    this.getPets();
  }
  getToken(){
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing from local storage');
    }
    return token;
  }

  ngOnInit() {
    this.getUserPost();
    this.getPets();
  }

  getUserPost(){

    this.isLoading = true;
    this.petquestservice.getPostUser(this.getToken()).subscribe({
      next: (response) => {

        this.userPosts = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
      complete: () => {

        this.isLoading = false;
      },

    })


}}
