import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlublicationComponent } from './form-plublication.component';

describe('FormPlublicationComponent', () => {
  let component: FormPlublicationComponent;
  let fixture: ComponentFixture<FormPlublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
