import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvPageComponent } from './tv-page.component';

describe('SeriesPageComponent', () => {
  let component: TvPageComponent;
  let fixture: ComponentFixture<TvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
