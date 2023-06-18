import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopDrawerComponent } from './search-top-drawer.component';

describe('SearchTopDrawerComponent', () => {
  let component: SearchTopDrawerComponent;
  let fixture: ComponentFixture<SearchTopDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTopDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
