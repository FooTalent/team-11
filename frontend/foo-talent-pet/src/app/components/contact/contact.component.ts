import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../service/contact.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterLink,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private contactService: ContactService) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      this.contactService.sendContactForm(contactForm.value).subscribe({
        next: (response) => {
          console.log('Función correctamente', response);
        },
        error: (error) => {
          console.error('Error al enviar el formulario', error);
        },
        complete: () => {
          console.log('Envío del formulario completado');
          // console.log(`info:  ${JSON.stringify(contactForm.value)}`);
          contactForm.reset();


        }
      });
    }
  }
}
