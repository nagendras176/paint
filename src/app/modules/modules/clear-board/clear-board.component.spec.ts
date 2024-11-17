import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearBoardComponent } from './clear-board.component';

describe('ClearBoardComponent', () => {
  let component: ClearBoardComponent;
  let fixture: ComponentFixture<ClearBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
