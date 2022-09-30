import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailsPageComponent } from './tv-details-page.component';

describe('TvDetailsPageComponent', () => {
  let component: TvDetailsPageComponent;
  let fixture: ComponentFixture<TvDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
