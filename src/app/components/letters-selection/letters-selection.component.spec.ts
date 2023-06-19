import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersSelectionComponent } from './letters-selection.component';

describe('StartingMenuComponent', () => {
  let component: LettersSelectionComponent;
  let fixture: ComponentFixture<LettersSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LettersSelectionComponent]
    });
    fixture = TestBed.createComponent(LettersSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
