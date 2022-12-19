import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDetailsDialogComponent } from './media-details-dialog.component';

describe('MovieDetailsDialogComponent', () => {
  let component: MediaDetailsDialogComponent;
  let fixture: ComponentFixture<MediaDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
