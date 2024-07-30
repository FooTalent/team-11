import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingUneteComponent } from './landing-unete.component';

describe('LandingUneteComponent', () => {
  let component: LandingUneteComponent;
  let fixture: ComponentFixture<LandingUneteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingUneteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingUneteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
