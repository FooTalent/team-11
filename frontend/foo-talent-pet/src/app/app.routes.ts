import { Routes } from '@angular/router';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component"
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MascotasperdidasComponent } from './components/mascotasperdidas/mascotasperdidas.component';
import { MascotasencontradasComponent } from './components/mascotasencontradas/mascotasencontradas.component';
import { MascotasadopcionComponent } from './components/mascotasadopcion/mascotasadopcion.component';
import { FormPlublicationComponent } from './components/form-plublication/form-plublication.component';
import { ContactComponent } from './components/contact/contact.component';
import { FiltroperdidasComponent } from './components/filtroperdidas/filtroperdidas.component';
import { LandingAboutusComponent } from './components/landing-aboutus/landing-aboutus.component';
import { LandingComofuncionaComponent } from './components/landing-comofunciona/landing-comofunciona.component';
import { LandingEncuentraComponent } from './components/landing-encuentra/landing-encuentra.component';
import { LandingTestimonialComponent } from './components/landing-testimonial/landing-testimonial.component';
import { LandingUneteComponent } from './components/landing-unete/landing-unete.component';
import { PetsCardComponent } from './components/pets-card/pets-card.component';
import { PetsDetailsComponent } from './components/pets-details/pets-details.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent},
    {path: 'preguntas-Frecuentes', component: PreguntasFrecuentesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'about-us', component:AboutUsComponent},
    {path: 'mascotas-perdidas', component: MascotasperdidasComponent},
    {path: 'mascotas-encontradas', component: MascotasencontradasComponent},
    {path: 'mascotas-adopcion', component: MascotasadopcionComponent},
    {path: 'form-publication', component: FormPlublicationComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'filtro-perdidas', component: FiltroperdidasComponent},
    {path: 'land-about', component: LandingAboutusComponent},
    {path: 'land-como-funciona', component: LandingComofuncionaComponent},
    {path: 'land-encuentra', component: LandingEncuentraComponent},
    {path: 'land-testimonial', component: LandingTestimonialComponent},
    {path: 'land-unete', component: LandingUneteComponent},
    {path: 'pets-card', component: PetsCardComponent},
    {path: 'pets-details', component: PetsDetailsComponent},
    {path: 'profile', component: ProfileComponent}
];
