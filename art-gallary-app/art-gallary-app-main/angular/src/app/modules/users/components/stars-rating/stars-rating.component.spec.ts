import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRatingComponent } from './stars-rating.component';

describe('StarsRatingComponent', () => {
  let component: StarsRatingComponent;
  let fixture: ComponentFixture<StarsRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsRatingComponent]
    });
    fixture = TestBed.createComponent(StarsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
