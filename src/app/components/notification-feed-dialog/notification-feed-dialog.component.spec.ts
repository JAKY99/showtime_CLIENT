import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFeedDialogComponent } from './notification-feed-dialog.component';

describe('NotificationFeedDialogComponent', () => {
  let component: NotificationFeedDialogComponent;
  let fixture: ComponentFixture<NotificationFeedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationFeedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
