import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterListComponent } from './poster-list.component';

describe('PosterListComponent', () => {
  let component: PosterListComponent;
  let fixture: ComponentFixture<PosterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
