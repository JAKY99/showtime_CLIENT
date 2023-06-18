import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopTvDetailsComponent } from './desktop-tv-details.component';

describe('DesktopTvDetailsComponent', () => {
  let component: DesktopTvDetailsComponent;
  let fixture: ComponentFixture<DesktopTvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopTvDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopTvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
