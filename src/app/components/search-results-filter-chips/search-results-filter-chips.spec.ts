import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsFilterChips } from './search-results-filter-chips';

describe('SearchResultsFilterChips', () => {
  let component: SearchResultsFilterChips;
  let fixture: ComponentFixture<SearchResultsFilterChips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsFilterChips],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsFilterChips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
