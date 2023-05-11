import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGenresComponent } from './carousel-genres.component';

describe('CarouselGenresComponent', () => {
  let component: CarouselGenresComponent;
  let fixture: ComponentFixture<CarouselGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
