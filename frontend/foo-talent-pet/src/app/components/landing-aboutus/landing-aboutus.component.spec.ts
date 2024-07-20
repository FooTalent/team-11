import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAboutusComponent } from './landing-aboutus.component';

describe('LandingAboutusComponent', () => {
  let component: LandingAboutusComponent;
  let fixture: ComponentFixture<LandingAboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingAboutusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
