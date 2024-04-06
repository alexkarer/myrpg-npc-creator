import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStatArrayInfoComponent } from './base-stat-array-info.component';

describe('BaseStatArrayInfoComponent', () => {
  let component: BaseStatArrayInfoComponent;
  let fixture: ComponentFixture<BaseStatArrayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseStatArrayInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseStatArrayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
