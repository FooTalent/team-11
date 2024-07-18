import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { PetQuestService } from "../../service/pet-quest.service";

@Component({
  selector: 'app-card-edit',
  standalone: true,
  imports: [],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent {
  @Input() pet: any;
  token:string = "";

  constructor(private router: Router,private petQuestService:PetQuestService) { }

  ngOnInit() {
    this.getToken();
  }


  viewPet(pet: any) {
    this.router.navigate(['pets-details-edit', pet.id], { state: { pet: pet } });
    // console.log(pet)
  }
  getToken(){
    this.token = localStorage.getItem('token') ?? '';
    console.log(this.token)
  }
  
   delatePost(pet: any){
    this.petQuestService.DelatePost(pet.id,this.token).subscribe({
      next: (response) => {
        //pop-up
        console.log("eliminado")
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completado');
      },
    });
    console.log(pet)

}
}