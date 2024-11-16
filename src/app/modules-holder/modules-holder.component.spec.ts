import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesHolderComponent } from './modules-holder.component';

describe('ModulesHolderComponent', () => {
  let component: ModulesHolderComponent;
  let fixture: ComponentFixture<ModulesHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
