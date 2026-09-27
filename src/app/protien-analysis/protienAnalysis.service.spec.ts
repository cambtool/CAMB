/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ProtienAnalysisService } from './protienAnalysis.service';

describe('Service: ProtienAnalysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProtienAnalysisService]
    });
  });

  it('should ...', inject([ProtienAnalysisService], (service: ProtienAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
