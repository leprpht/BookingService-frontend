import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nameSetupGuard } from './name-setup-guard';

describe('nameSetupGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nameSetupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
