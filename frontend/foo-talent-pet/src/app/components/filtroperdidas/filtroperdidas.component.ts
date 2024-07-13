import { Component, Output, EventEmitter  } from '@angular/core';
// import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-filtroperdidas',
  standalone: true,
  imports: [],
  templateUrl: './filtroperdidas.component.html',
  styleUrl: './filtroperdidas.component.css'
})
export class FiltroperdidasComponent {
  @Output() filtersApplied = new EventEmitter<any>();

  applyFilters() {
    const animal = (document.getElementById('animal') as HTMLSelectElement).value;
    const provincia = (document.getElementById('provincia') as HTMLSelectElement).value;
    const ciudad = (document.getElementById('ciudad') as HTMLSelectElement).value;
    const localidad = (document.getElementById('localidad') as HTMLSelectElement).value;
    const fecha = (document.getElementById('fecha') as HTMLSelectElement).value;
    const color = (document.getElementById('color') as HTMLSelectElement).value;

    const filters = {
      animal,
      provincia,
      ciudad,
      localidad,
      fecha,
      color
    };

    this.filtersApplied.emit(filters);
  }


}
