import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PetsCardComponent } from '../pets-card/pets-card.component';
import { CommonModule } from '@angular/common';
import { Comment, PetResponse, Filters } from '../../interfaces/interfaces';
import { PetQuestService } from '../../service/pet-quest.service';
import { FormsModule } from '@angular/forms';
import { LostpetsService } from '../../service/posts/lostpets.service';
import { SpinerComponent } from '../spiner/spiner.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    PetsCardComponent,
    CommonModule,
    FormsModule,
    SpinerComponent,
  ],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css',
})
export class PetsDetailsComponent implements OnInit {
  appliedFilters: Filters = {
    animal: null,
    gender: null,
    province: null,
    city: null,
    locality: null,
    date: null,
    colors: null,
    tags: null,
  };
  user: any;
  order: boolean = true;
  pets: any;
  isLoading = false;
  btnReport: boolean = false;
  btnConfirmReport = false;
  reportCommentContent: string = '';
  reportStatus: string = '';

  reportComent() {
    this.reportStatus = 'comment';
    this.btnReport = true;
  }

  reportPost() {
    this.reportStatus = 'post';
    this.btnReport = true;
  }

  confirmReport(id: string) {
    this.btnReport = !this.btnReport;
    const token = localStorage.getItem('token');
    if (!token) return;
    if (this.reportStatus === 'comment')
      this.petQuestService
        .reportComment(id, this.reportCommentContent, token)
        .subscribe();
    else
      this.petQuestService
        .reportPost(this.pet.id, this.reportCommentContent, token)
        .subscribe();
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
  auth: boolean = false;
  comments: Comment[] = [];
  token: string = '';
  commentContent: string = '';
  isLoadingComments = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petQuestService: PetQuestService,
    private LostService: LostpetsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        this.router.navigate(['/']);
        return;
      }
      this.token = localStorage.getItem('token') || '';
      if (this.token === '') {
        this.auth = false;
      } else {
        this.auth = true;
      }
      this.getPet(id);
      this.getPets();
      this.getUser();
    }
  }

  getPet(id: string) {
    this.petQuestService.getPet(id).subscribe((pet) => {
      this.pet = pet.post;
      this.comments = pet.comments;
    });
  }

  createComment() {
    this.isLoadingComments = true;
    if (this.commentContent.trim() === '') {
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) return;
    this.petQuestService
      .createComment(this.pet.id, this.commentContent, token)
      .subscribe((comment) => {
        this.isLoadingComments = false;
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

  getPets() {
    this.isLoading = true;
    this.LostService.getPets(
      'FOUND',
      this.appliedFilters,
      this.order
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.pets = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getUser() {
    this.userService.getUser(this.token).subscribe((user) => {
      this.user = user;
    });
  }
}
