import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAvatarComponent } from './comment-avatar.component';

describe('CommentAvatarComponent', () => {
  let component: CommentAvatarComponent;
  let fixture: ComponentFixture<CommentAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
