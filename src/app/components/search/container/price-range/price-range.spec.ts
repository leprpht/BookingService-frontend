import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRange } from './price-range';

describe('SearchContainerPriceRange', () => {
  let component: PriceRange;
  let fixture: ComponentFixture<PriceRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceRange],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceRange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
