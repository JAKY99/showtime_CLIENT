import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDescriptionComponent } from './truncated-description.component';

describe('TruncatedDescriptionComponent', () => {
  let component: TruncatedDescriptionComponent;
  let fixture: ComponentFixture<TruncatedDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruncatedDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
