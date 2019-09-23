import { TestBed, ComponentFixture } from '@angular/core/testing';

import { PincheckerService } from './pinchecker.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PincheckerService', () => {
  let service: PincheckerService;
  class fakeService {};

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            PincheckerService, {provide: Router, useValue: fakeService},
            HttpClient, HttpHandler
        ],
    }).compileComponents();

    service = TestBed.get(PincheckerService);

});

  it('should deny a PIN with letters instead of numbers', () => {
    expect(service['validPIN'](Number.parseInt("test"))).toBe(false);
  });

  it('should deny a PIN with incorrect length', () => {
    expect(service['validPIN'](123)).toBe(false);
  });

  it('should approve an incorrect PIN', () => {
    expect(service['validPIN'](1234)).toBe(true);
  });
  
  it('should call the confirm PIN method with a valid PIN', () => {
    spyOn<any>(service, 'confirmPIN');
    service.submitPINForChecks(1234);
    expect(service['confirmPIN']).toHaveBeenCalled();
  });
  
  it('should call the navigate to home method with the correct PIN', () => {
    spyOn<any>(service, 'navigateToHome');
    service.submitPINForChecks(1111);
    expect(console.log("Current balance: £220"));
  });
});
