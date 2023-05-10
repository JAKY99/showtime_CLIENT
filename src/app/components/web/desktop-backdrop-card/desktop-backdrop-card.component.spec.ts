import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopBackdropCardComponent } from './desktop-backdrop-card.component';

describe('DesktopBackdropCardComponent', () => {
  let component: DesktopBackdropCardComponent;
  let fixture: ComponentFixture<DesktopBackdropCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopBackdropCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopBackdropCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
