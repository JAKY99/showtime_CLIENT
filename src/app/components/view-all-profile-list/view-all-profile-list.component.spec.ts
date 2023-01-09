import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProfileListComponent } from './view-all-profile-list.component';

describe('ViewAllProfileListComponent', () => {
  let component: ViewAllProfileListComponent;
  let fixture: ComponentFixture<ViewAllProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
