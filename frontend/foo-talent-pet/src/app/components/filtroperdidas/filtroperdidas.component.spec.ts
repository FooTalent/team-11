import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroperdidasComponent } from './filtroperdidas.component';

describe('FiltroperdidasComponent', () => {
  let component: FiltroperdidasComponent;
  let fixture: ComponentFixture<FiltroperdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroperdidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroperdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
