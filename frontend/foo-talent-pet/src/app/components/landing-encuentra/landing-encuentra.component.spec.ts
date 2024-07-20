import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEncuentraComponent } from './landing-encuentra.component';

describe('LandingEncuentraComponent', () => {
  let component: LandingEncuentraComponent;
  let fixture: ComponentFixture<LandingEncuentraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingEncuentraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEncuentraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
