import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleHolderComponent } from './module-holder.component';

describe('ModuleHolderComponent', () => {
  let component: ModuleHolderComponent;
  let fixture: ComponentFixture<ModuleHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
