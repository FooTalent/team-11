// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { LoginComponent } from './app/components/login/login.component';
// import { NavbarComponent } from './app/components/navbar/navbar.component';
// import { BtnLoginService } from './app/service/btn-login.service';

bootstrapApplication(AppComponent, appConfig,)
  .catch((err) => console.error(err));


  // @NgModule({
  //   imports: [
  //     NgbModule
  //   ],
  //   providers: [
  //     BtnLoginService
  //   ]
  // })
  // export class AppModule{}