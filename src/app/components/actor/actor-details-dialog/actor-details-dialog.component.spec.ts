import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetailsDialogComponent } from './actor-details-dialog.component';

describe('ActorDetailsDialogComponent', () => {
  let component: ActorDetailsDialogComponent;
  let fixture: ComponentFixture<ActorDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
