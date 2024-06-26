import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasperdidasComponent } from './mascotasperdidas.component';

describe('MascotasperdidasComponent', () => {
  let component: MascotasperdidasComponent;
  let fixture: ComponentFixture<MascotasperdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasperdidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasperdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
