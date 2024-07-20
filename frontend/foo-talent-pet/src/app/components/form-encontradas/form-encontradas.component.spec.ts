import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEncontradasComponent } from './form-encontradas.component';

describe('FormEncontradasComponent', () => {
  let component: FormEncontradasComponent;
  let fixture: ComponentFixture<FormEncontradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEncontradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEncontradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
