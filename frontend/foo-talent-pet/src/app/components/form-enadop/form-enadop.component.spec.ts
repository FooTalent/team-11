import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnadopComponent } from './form-enadop.component';

describe('FormEnadopComponent', () => {
  let component: FormEnadopComponent;
  let fixture: ComponentFixture<FormEnadopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEnadopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnadopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
