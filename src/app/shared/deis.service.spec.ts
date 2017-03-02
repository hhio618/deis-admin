/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeisService } from './deis.service';

describe('Service: Deis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeisService]
    });
  });

  it('should ...', inject([DeisService], (service: DeisService) => {
    expect(service).toBeTruthy();
  }));
});
