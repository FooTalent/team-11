import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludoDasboardComponent } from './saludo-dasboard.component';

describe('SaludoDasboardComponent', () => {
  let component: SaludoDasboardComponent;
  let fixture: ComponentFixture<SaludoDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaludoDasboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaludoDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
