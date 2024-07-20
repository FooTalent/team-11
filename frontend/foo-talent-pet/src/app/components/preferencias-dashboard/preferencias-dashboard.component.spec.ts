import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciasDashboardComponent } from './preferencias-dashboard.component';

describe('PreferenciasDashboardComponent', () => {
  let component: PreferenciasDashboardComponent;
  let fixture: ComponentFixture<PreferenciasDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenciasDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
