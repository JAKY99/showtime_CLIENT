import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentResponseComponent } from './comment-response.component';

describe('CommentResponseComponent', () => {
  let component: CommentResponseComponent;
  let fixture: ComponentFixture<CommentResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
