import { Routes } from '@angular/router';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component"
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MascotasperdidasComponent } from './components/mascotasperdidas/mascotasperdidas.component';
import { MascotasencontradasComponent } from './components/mascotasencontradas/mascotasencontradas.component';
import { MascotasadopcionComponent } from './components/mascotasadopcion/mascotasadopcion.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent},
    {path: 'preguntas-Frecuentes', component: PreguntasFrecuentesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'about-us', component:AboutUsComponent},
    {path: 'mascotas-perdidas', component: MascotasperdidasComponent},
    {path: 'mascotas-encontradas', component: MascotasencontradasComponent},
    {path: 'mascotas-adopcion', component: MascotasadopcionComponent}
];
