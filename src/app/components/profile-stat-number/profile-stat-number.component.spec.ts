import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatNumberComponent } from './profile-stat-number.component';

describe('ProfileStatNumberComponent', () => {
  let component: ProfileStatNumberComponent;
  let fixture: ComponentFixture<ProfileStatNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
