import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTestimonialComponent } from './landing-testimonial.component';

describe('LandingTestimonialComponent', () => {
  let component: LandingTestimonialComponent;
  let fixture: ComponentFixture<LandingTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
