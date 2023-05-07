import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCropDialogComponent } from './picture-crop-dialog.component';

describe('PictureCropDialogComponent', () => {
  let component: PictureCropDialogComponent;
  let fixture: ComponentFixture<PictureCropDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureCropDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
