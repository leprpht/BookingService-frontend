import { TestBed } from '@angular/core/testing';

import { GraphQlService } from './graphql-service';

describe('SearchService', () => {
  let service: GraphQlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
