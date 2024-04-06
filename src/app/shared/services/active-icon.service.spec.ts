import { TestBed } from '@angular/core/testing';

import { ActiveIconService } from './active-icon.service';

describe('ActiveIconService', () => {
  let service: ActiveIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
