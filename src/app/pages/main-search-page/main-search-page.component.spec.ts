import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchPageComponent } from './main-search-page.component';

describe('MainSearchPageComponent', () => {
  let component: MainSearchPageComponent;
  let fixture: ComponentFixture<MainSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
