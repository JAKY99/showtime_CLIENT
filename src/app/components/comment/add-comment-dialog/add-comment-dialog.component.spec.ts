import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentDialogComponent } from './add-comment-dialog.component';

describe('AddCommentDialogComponent', () => {
  let component: AddCommentDialogComponent;
  let fixture: ComponentFixture<AddCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
