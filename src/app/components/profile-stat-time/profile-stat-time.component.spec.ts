import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatTimeComponent } from './profile-stat-time.component';

describe('ProfileStatTimeComponent', () => {
  let component: ProfileStatTimeComponent;
  let fixture: ComponentFixture<ProfileStatTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
