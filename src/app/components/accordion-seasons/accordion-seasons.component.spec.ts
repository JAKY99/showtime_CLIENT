import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSeasonsComponent } from './accordion-seasons.component';

describe('AccordionSeasonsComponent', () => {
  let component: AccordionSeasonsComponent;
  let fixture: ComponentFixture<AccordionSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionSeasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
