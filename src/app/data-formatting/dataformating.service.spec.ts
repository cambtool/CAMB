/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataformatingService } from './dataformating.service';

describe('Service: Dataformating', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataformatingService]
    });
  });

  it('should ...', inject([DataformatingService], (service: DataformatingService) => {
    expect(service).toBeTruthy();
  }));
});
