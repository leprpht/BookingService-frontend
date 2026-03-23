import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerRating } from './search-container-rating';

describe('SearchContainerRating', () => {
  let component: SearchContainerRating;
  let fixture: ComponentFixture<SearchContainerRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerRating],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
