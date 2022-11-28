import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopSectionComponent } from './profile-top-section.component';

describe('ProfileTopSectionComponent', () => {
  let component: ProfileTopSectionComponent;
  let fixture: ComponentFixture<ProfileTopSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTopSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
