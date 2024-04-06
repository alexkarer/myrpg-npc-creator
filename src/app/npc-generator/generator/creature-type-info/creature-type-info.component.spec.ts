import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureTypeInfoComponent } from './creature-type-info.component';

describe('CreatureTypeInfoComponent', () => {
  let component: CreatureTypeInfoComponent;
  let fixture: ComponentFixture<CreatureTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatureTypeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatureTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
