import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerPriceRange } from './search-container-price-range';

describe('SearchContainerPriceRange', () => {
  let component: SearchContainerPriceRange;
  let fixture: ComponentFixture<SearchContainerPriceRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerPriceRange],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerPriceRange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
