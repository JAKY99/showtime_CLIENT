import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProvidersComponent } from './watch-providers.component';

describe('WatchProvidersComponent', () => {
  let component: WatchProvidersComponent;
  let fixture: ComponentFixture<WatchProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
