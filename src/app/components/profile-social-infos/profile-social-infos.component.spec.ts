import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSocialInfosComponent } from './profile-social-infos.component';

describe('ProfileSocialInfosComponent', () => {
  let component: ProfileSocialInfosComponent;
  let fixture: ComponentFixture<ProfileSocialInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSocialInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSocialInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
