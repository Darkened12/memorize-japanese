import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingMenuComponent } from './starting-menu.component';

describe('StartingMenuComponent', () => {
  let component: StartingMenuComponent;
  let fixture: ComponentFixture<StartingMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartingMenuComponent]
    });
    fixture = TestBed.createComponent(StartingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
