import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../service/contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private contactService: ContactService) {}

  onSubmit(contactForm: NgForm) {
    Swal.fire({
      color: "black",
      background: "#D9EFF2",
      title: "Confirmar envío",
      text: "¿Querés enviar el mensaje?",
      showCancelButton: true,
      confirmButtonColor: "#FEB941",
      cancelButtonColor: "#FDE49E",
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "No, cancelar",
      didOpen: () => {
        const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
        const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;

        if (confirmButton) {
          confirmButton.style.color = "#000";
          confirmButton.style.borderRadius = "22px";
          confirmButton.style.marginRight = "25px";
          confirmButton.style.padding = "12px 25px";
          confirmButton.style.width = "170px";
        }
        if (cancelButton)  {
          cancelButton.style.color = "#000";
          cancelButton.style.borderRadius = "22px";
          cancelButton.style.padding = "12px 25px";
          cancelButton.style.width = "170px";
        };

      }
    }).then((result) => {
      if (result.isConfirmed) {
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
              contactForm.reset();
            }
          });
        }
        Swal.fire({
          title: "GRACIAS",
          text: "tu mensaje ha sido enviado",
          icon: "success"
        });
      }
    });
  }
}
