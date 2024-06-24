import { Routes } from '@angular/router';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component"

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent},
    {path: 'preguntasFrecuentes', component: PreguntasFrecuentesComponent},
    {path: 'preguntasFrecuentes', component:PreguntasFrecuentesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}

];
