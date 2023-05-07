import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAvatarComponent } from './header-avatar.component';

describe('HeaderAvatarComponent', () => {
  let component: HeaderAvatarComponent;
  let fixture: ComponentFixture<HeaderAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
