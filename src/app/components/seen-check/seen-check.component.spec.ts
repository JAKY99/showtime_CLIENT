import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenCheckComponent } from './seen-check.component';

describe('SeenCheckComponent', () => {
  let component: SeenCheckComponent;
  let fixture: ComponentFixture<SeenCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeenCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
