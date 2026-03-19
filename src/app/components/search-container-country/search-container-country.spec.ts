import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerCountry } from './search-container-country';

describe('SearchContainerCountry', () => {
  let component: SearchContainerCountry;
  let fixture: ComponentFixture<SearchContainerCountry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerCountry],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerCountry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
