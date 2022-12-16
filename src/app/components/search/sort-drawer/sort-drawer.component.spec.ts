import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDrawerComponent } from './sort-drawer.component';

describe('SortDrawerComponent', () => {
  let component: SortDrawerComponent;
  let fixture: ComponentFixture<SortDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
