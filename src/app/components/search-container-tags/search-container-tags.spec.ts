import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerTags } from './search-container-tags';

describe('SearchContainerTags', () => {
  let component: SearchContainerTags;
  let fixture: ComponentFixture<SearchContainerTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerTags],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerTags);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
