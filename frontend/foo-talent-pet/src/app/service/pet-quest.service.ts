import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Pet } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
  private baseUrl = environment.apiUrl+'auth/login';
  private baseUrl1 = environment.apiUrl+'posts';



  constructor(private http: HttpClient) { }

  login(payload:any){

	return this.http.post(this.baseUrl, payload);
  }


  PostPet(payload:Pet,token:string){
    console.log(payload);
    const pet = {
      
        name: payload.name,
        description: payload.description,
        date: payload.date,
        status: payload.status,
        speciesType: payload.speciesType,
        gender: payload.gender,
        province: payload.province,
        city: payload.city,
        locality: payload.locality,
        contact: payload.contact,
        tags: payload.tags,
        colors: payload.colors,
      

    }
    console.log(pet);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };


    return this.http.post(this.baseUrl1, pet,options);
  }
}
