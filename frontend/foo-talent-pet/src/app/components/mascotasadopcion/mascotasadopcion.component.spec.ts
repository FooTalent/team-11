import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasadopcionComponent } from './mascotasadopcion.component';

describe('MascotasadopcionComponent', () => {
  let component: MascotasadopcionComponent;
  let fixture: ComponentFixture<MascotasadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasadopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
