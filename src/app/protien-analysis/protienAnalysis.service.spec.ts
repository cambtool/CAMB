/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProtienAnalysisService } from './protienAnalysis.service';

describe('Service: ProtienAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtienAnalysisService]
    });
  });

  it('should ...', inject([ProtienAnalysisService], (service: ProtienAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
