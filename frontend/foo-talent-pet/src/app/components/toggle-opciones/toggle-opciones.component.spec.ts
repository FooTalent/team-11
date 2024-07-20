import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleOpcionesComponent } from './toggle-opciones.component';

describe('ToggleOpcionesComponent', () => {
  let component: ToggleOpcionesComponent;
  let fixture: ComponentFixture<ToggleOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
