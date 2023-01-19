import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterImageComponent } from './poster-image.component';

describe('PosterImageComponent', () => {
  let component: PosterImageComponent;
  let fixture: ComponentFixture<PosterImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
