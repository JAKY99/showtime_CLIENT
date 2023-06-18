import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMediaComponent } from './recommended-media.component';

describe('RecommendedMediaComponent', () => {
  let component: RecommendedMediaComponent;
  let fixture: ComponentFixture<RecommendedMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
