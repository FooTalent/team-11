import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {

  public mostrarConfirmacion( ): void{
    
    Swal.fire({
      title: "Ya casi....",
      text: "¿Querés subir la publicación? ",
      showCancelButton: true,
      confirmButtonColor: "#feb941",
      cancelButtonColor: "#fde49d",
      confirmButtonText: "Si, publicar",
      cancelButtonText: "No, cancelar" ,
      background: "#B8E4E9",
      customClass:{
        popup: 'custom-popup',
        cancelButton: 'cancelBtn-pop',
        confirmButton: 'confirmBtn-pop',
      }
        
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: "Genial",
          background: "#B8E4E9",
          html: '<p>Tu publicación se ha subido con éxito</p> <img src="../../assets/grupo-animales-lindos-sobre-fondo-blanco 2.png" alt="imagen-alert" style="width: 400; height: auto">',
          timer: 3000,
          customClass:{
            popup: 'custom-popup-if',
            title: 'titulo-pop',
            image: 'img-pop'
          },
          showConfirmButton: false,
        });
        
      }
    });
  }

  public cerrarConfirmacion(): void{
    Swal.close();
  }

  constructor() { }
}
