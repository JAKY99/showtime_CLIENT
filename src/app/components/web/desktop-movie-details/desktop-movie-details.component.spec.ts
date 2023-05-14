import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMovieDetailsComponent } from './desktop-movie-details.component';

describe('DesktopMovieDetailsComponent', () => {
  let component: DesktopMovieDetailsComponent;
  let fixture: ComponentFixture<DesktopMovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopMovieDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopMovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
