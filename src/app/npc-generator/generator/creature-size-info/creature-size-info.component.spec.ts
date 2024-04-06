import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureSizeInfoComponent } from './creature-size-info.component';

describe('CreatureSizeInfoComponent', () => {
  let component: CreatureSizeInfoComponent;
  let fixture: ComponentFixture<CreatureSizeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatureSizeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatureSizeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
