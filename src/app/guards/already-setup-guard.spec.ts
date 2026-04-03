import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { alreadySetupGuard } from './already-setup-guard';

describe('alreadySetupGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alreadySetupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
