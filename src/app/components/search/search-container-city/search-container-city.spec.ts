import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerCity } from './search-container-city';

describe('SearchContainerCity', () => {
  let component: SearchContainerCity;
  let fixture: ComponentFixture<SearchContainerCity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerCity],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerCity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
