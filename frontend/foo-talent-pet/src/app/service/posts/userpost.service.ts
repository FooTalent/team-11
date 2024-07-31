import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/interfaces';



@Injectable({
    providedIn: 'root'
})
export class UserPostService {

   apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getPestsUser(user:User) {    
        let query = ""
        return this.http.get<any>((`${this.apiUrl}posts/${status}?${query}`));
    }
    

}