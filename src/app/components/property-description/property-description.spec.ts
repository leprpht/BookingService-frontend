import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDescription } from './property-description';

describe('PropertyDescription', () => {
  let component: PropertyDescription;
  let fixture: ComponentFixture<PropertyDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
