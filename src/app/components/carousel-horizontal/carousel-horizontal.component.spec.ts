import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHorizontalComponent } from './carousel-horizontal.component';

describe('CarouselHorizontalComponent', () => {
  let component: CarouselHorizontalComponent;
  let fixture: ComponentFixture<CarouselHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
