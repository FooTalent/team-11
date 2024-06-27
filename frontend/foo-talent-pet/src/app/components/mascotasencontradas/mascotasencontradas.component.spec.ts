import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasencontradasComponent } from './mascotasencontradas.component';

describe('MascotasencontradasComponent', () => {
  let component: MascotasencontradasComponent;
  let fixture: ComponentFixture<MascotasencontradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasencontradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasencontradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
