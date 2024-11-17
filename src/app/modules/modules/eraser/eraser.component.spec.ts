import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraserComponent } from './eraser.component';

describe('EraserComponent', () => {
  let component: EraserComponent;
  let fixture: ComponentFixture<EraserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EraserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EraserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
