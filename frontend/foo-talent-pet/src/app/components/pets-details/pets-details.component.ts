import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { Comment, PetResponse } from '../../interfaces/interfaces';
import { PetQuestService } from '../../service/pet-quest.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    PetsCardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css',
})
export class PetsDetailsComponent implements OnInit {
  btnReport: boolean = false;
  btnConfirmReport = false;
  reportCommentContent: string = '';
  reportStatus: string = '';

  reportComent() {
    this.reportStatus = 'comment';
    this.btnReport = true;
  }

  reportPost(){
    this.reportStatus = 'post';
    this.btnReport = true;
  }

  confirmReport(id: string) {
    this.btnReport = !this.btnReport;
    const token = localStorage.getItem('token');
    if(!token) return;
    if(this.reportStatus === 'comment') this.petQuestService.reportComment(id, this.reportCommentContent, token).subscribe();
    else this.petQuestService.reportPost(this.pet.id, this.reportCommentContent, token).subscribe();
  }

/*   confirmReportPost() {
    this.btnReport = !this.btnReport;
    const token = localStorage.getItem('token');
    if(!token) return;
    this.petQuestService.reportPost(this.pet.id, this.reportCommentContent, token).subscribe();
  } */

  pet: PetResponse = {
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

  comments: Comment[] = [];

  commentContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petQuestService: PetQuestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.getPet(id);
  }

  getPet(id: string) {
    this.petQuestService.getPet(id).subscribe((pet) => {
      this.pet = pet.post;
      this.comments = pet.comments;
    });
  }

  createComment() {
    if (this.commentContent.trim() === '') {
      return;
    }
    const token = localStorage.getItem('token');
    if(!token) return;
    this.petQuestService
      .createComment(this.pet.id, this.commentContent, token)
      .subscribe((comment) => {
        this.comments.push(comment);
        this.commentContent = '';
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  formatDateWithHour(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    return `${day} / ${month} / ${year} - ${hour}hs`;
  }
}
