import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUnitCard } from './unit-card';

describe('PropertyUnitCard', () => {
  let component: PropertyUnitCard;
  let fixture: ComponentFixture<PropertyUnitCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyUnitCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyUnitCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
