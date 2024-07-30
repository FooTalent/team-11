import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComofuncionaComponent } from './landing-comofunciona.component';

describe('LandingComofuncionaComponent', () => {
  let component: LandingComofuncionaComponent;
  let fixture: ComponentFixture<LandingComofuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComofuncionaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComofuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
