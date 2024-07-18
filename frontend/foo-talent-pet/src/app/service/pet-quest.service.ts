import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Pet, PetResponse, PetWithComments } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PetQuestService {
<<<<<<< Updated upstream
  private baseUrl = environment.apiUrl+'auth/login';
  private baseUrl1 = environment.apiUrl+'posts';
  private apiUrl = environment.apiUrl;
=======
  private baseUrl = environment.apiUrl;
  

>>>>>>> Stashed changes


  constructor(private http: HttpClient) { }

  login(payload:any){


	return this.http.post(this.baseUrl+'auth/login', payload);
  }


<<<<<<< Updated upstream
  PostPet(payload:Pet,token:string) : Observable<PetResponse>{
=======
  PostPet(payload:Pet,token:string){
    console.log(token);
    console.log(payload);
>>>>>>> Stashed changes
    const pet = {
        name: payload.name,
        description: payload.description,
        date: payload.date,
        status: payload.status ,
        speciesType: payload.speciesType,
        gender: payload.gender,
        province: payload.province,
        city: payload.city,
        locality: payload.locality,
        contact: payload.contact,
        tags: payload.tags,
        colors: payload.colors,
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };


<<<<<<< Updated upstream
    return this.http.post<PetResponse>(this.baseUrl1, pet,options);
  }

  postImage(images:File [],id: string,token:string){
=======
    return this.http.post(this.baseUrl+'posts', pet,options);
  }

  getPostUser(token:string){
>>>>>>> Stashed changes
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };
<<<<<<< Updated upstream

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.post(`${this.baseUrl1}/${id}/images`, formData,options);
  }

  getPet(id:string): Observable<PetWithComments>{
    return this.http.get<PetWithComments>(`${this.baseUrl1}/${id}/comments`);
=======
    return this.http.get(this.baseUrl+'posts/user',options);
  }

  DelatePost(id:string,token:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = {
      headers: headers,
    };
    return this.http.delete(this.baseUrl+'posts/'+id,options);
>>>>>>> Stashed changes
  }
}
