import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsEdidComponent } from './pet-details-edid.component';

describe('PetDetailsEdidComponent', () => {
  let component: PetDetailsEdidComponent;
  let fixture: ComponentFixture<PetDetailsEdidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDetailsEdidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDetailsEdidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
