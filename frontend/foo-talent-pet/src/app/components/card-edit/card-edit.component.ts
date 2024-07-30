import { Component,Input,Output } from '@angular/core';
import { Router , ActivatedRoute, RouterLink} from '@angular/router';
import { PetQuestService } from "../../service/pet-quest.service";
import { PetResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-card-edit',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent {
  @Input() pet: PetResponse = {
    id: '',
    name: '',
    description: '',
    date: '',
    status: '',
    speciesType: '',
    gender: '',
    province: '',
    city: '',
    locality: '',
    contact: '',
    createdAt: '',
    user: {
      id: '',
      email: '',
      name: null,
      country: null,
      province: null,
      city: null,
      locality: null,
      phone: null,
      profilePicture: '',
    },
    tags: [],
    colors: [],
    images: [],
  };
;

  token:string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petQuestService: PetQuestService
  ) { }

  ngOnInit() {

    this.getToken();
  }


  viewPet(pet: any) {
    this.router.navigate(['pet-details-edit', pet.id], { state: { pet: pet } });
  }
  getToken(){
    this.token = localStorage.getItem('token') ?? '';
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
        this.refreshPage();
      },
    });
}

refreshPage() {
  this.router.navigate([this.router.url])
    .then(() => {
      window.location.reload();
    });
}

  editPost(pet: any){
    this.router.navigate(['pet-details-edit/:id'], { state: { pet: pet } });

  }
}
