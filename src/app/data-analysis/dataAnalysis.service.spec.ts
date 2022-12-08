/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataAnalysisService } from './dataAnalysis.service';

describe('Service: DataAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataAnalysisService]
    });
  });

  it('should ...', inject([DataAnalysisService], (service: DataAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
