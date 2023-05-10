import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopCarouselComponent } from './desktop-carousel.component';

describe('DesktopCarouselComponent', () => {
  let component: DesktopCarouselComponent;
  let fixture: ComponentFixture<DesktopCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
