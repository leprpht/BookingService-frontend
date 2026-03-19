import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsHeader } from './search-results-header';

describe('SearchResultsHeader', () => {
  let component: SearchResultsHeader;
  let fixture: ComponentFixture<SearchResultsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
