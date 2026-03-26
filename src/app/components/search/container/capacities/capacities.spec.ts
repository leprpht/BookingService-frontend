import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContainerCapacities } from './capacities';

describe('SearchContainerCapacities', () => {
  let component: SearchContainerCapacities;
  let fixture: ComponentFixture<SearchContainerCapacities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContainerCapacities],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContainerCapacities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
