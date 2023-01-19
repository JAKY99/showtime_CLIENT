import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselActorsListComponent } from './carousel-actors-list.component';

describe('CarouselActorsListComponent', () => {
  let component: CarouselActorsListComponent;
  let fixture: ComponentFixture<CarouselActorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselActorsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselActorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
