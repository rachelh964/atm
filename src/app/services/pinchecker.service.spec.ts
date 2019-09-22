import { TestBed } from '@angular/core/testing';

import { PincheckerService } from './pinchecker.service';

describe('PincheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PincheckerService = TestBed.get(PincheckerService);
    expect(service).toBeTruthy();
  });

  it('should ensure the input number only contains numbers', () => {
    this.service.checkPIN("test");
  })
});
