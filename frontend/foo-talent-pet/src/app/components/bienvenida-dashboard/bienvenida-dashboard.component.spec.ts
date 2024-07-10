import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaDashboardComponent } from './bienvenida-dashboard.component';

describe('BienvenidaDashboardComponent', () => {
  let component: BienvenidaDashboardComponent;
  let fixture: ComponentFixture<BienvenidaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
