import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMediaDialogComponent } from './recommended-media-dialog.component';

describe('RecommendedMediaDialogComponent', () => {
  let component: RecommendedMediaDialogComponent;
  let fixture: ComponentFixture<RecommendedMediaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedMediaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
