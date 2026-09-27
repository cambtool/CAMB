import { Injectable } from '@angular/core';
import { EbiToolsService } from '../core/ebi-tools.service';

@Injectable({
  providedIn: 'root'
})
export class ProtienAnalysisService {
  constructor(private ebi: EbiToolsService) { }

  getformat(format: string) {
    return this.ebi.getResource(format);
  }

  emboss_pepinfo_Run(obj: FormData) {
    return this.ebi.run('emboss_pepinfo', obj);
  }

  getEmboss_pepinfoStatus(jobId: any) {
    return this.ebi.status('emboss_pepinfo', jobId);
  }

  getEmboss_pepinfoResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_pepinfo', jobId, statusType);
  }
}
