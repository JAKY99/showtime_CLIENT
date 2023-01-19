import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatsCarouselComponent } from './profile-stats-carousel.component';

describe('ProfileStatsCarouselComponent', () => {
  let component: ProfileStatsCarouselComponent;
  let fixture: ComponentFixture<ProfileStatsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatsCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
