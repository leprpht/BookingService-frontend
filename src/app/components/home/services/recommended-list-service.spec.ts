import { TestBed } from '@angular/core/testing';

import { RecommendedListService } from './recommended-list-service-service';

describe('SearchService', () => {
  let service: RecommendedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
