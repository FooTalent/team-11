import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { PetQuestService } from '../../service/pet-quest.service';

import { LandingTestimonialComponent } from "../landing-testimonial/landing-testimonial.component";
import { LandingAboutusComponent } from '../landing-aboutus/landing-aboutus.component';
import { LandingEncuentraComponent } from '../landing-encuentra/landing-encuentra.component';
import { LandingUneteComponent } from '../landing-unete/landing-unete.component';
import { LandingComofuncionaComponent } from "../landing-comofunciona/landing-comofunciona.component";
import { ActivateTokenService } from '../../service/activate-token.service';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink,LandingTestimonialComponent,LandingAboutusComponent, LandingEncuentraComponent,LandingComofuncionaComponent,LandingUneteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private authService: ActivateTokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.activateAccount(token);
        
      }
    });
  }

}
