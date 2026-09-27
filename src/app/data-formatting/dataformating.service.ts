import { Injectable } from '@angular/core';
import { EbiToolsService } from '../core/ebi-tools.service';

@Injectable({
  providedIn: 'root'
})
export class DataformatingService {
  constructor(private ebi: EbiToolsService) { }

  getformat(format: string) {
    return this.ebi.getResource(format);
  }

  emboss_sixpack_Run(obj: FormData) {
    return this.ebi.run('emboss_sixpack', obj);
  }
  getEmboss_SixpackStatus(jobId: any) {
    return this.ebi.status('emboss_sixpack', jobId);
  }
  getEmboss_sixpackResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_sixpack', jobId, statusType);
  }

  phylogency_Run(obj: FormData) {
    return this.ebi.run('simple_phylogeny', obj);
  }
  getPhylogencyStatus(jobId: any) {
    return this.ebi.status('simple_phylogeny', jobId);
  }
  getPhylogencyResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_sixpack', jobId, statusType);
  }

  ncbiblast_Run(obj: FormData) {
    return this.ebi.run('ncbiblast', obj);
  }
  getncbiblastStatus(jobId: any) {
    return this.ebi.status('ncbiblast', jobId);
  }
  getncbiblastResult(jobId: any, statusType: any) {
    return this.ebi.result('ncbiblast', jobId, statusType);
  }

  FASTM_Run(obj: FormData) {
    return this.ebi.run('fastm', obj);
  }
  FASTMStatus(jobId: any) {
    return this.ebi.status('fastm', jobId);
  }
  FASTMResult(jobId: any, statusType: any) {
    return this.ebi.result('fastm', jobId, statusType);
  }

  FASTA_Run(obj: FormData) {
    return this.ebi.run('fasta', obj);
  }
  FASTAStatus(jobId: any) {
    return this.ebi.status('fasta', jobId);
  }
  FASTAResult(jobId: any, statusType: any) {
    return this.ebi.result('fasta', jobId, statusType);
  }

  NewCPG_Run(obj: FormData) {
    return this.ebi.run('emboss_newcpgreport', obj);
  }
  NewCPGStatus(jobId: any) {
    return this.ebi.status('emboss_newcpgreport', jobId);
  }
  NewCPGResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_newcpgreport', jobId, statusType);
  }

  TRANSEQ_Run(obj: FormData) {
    return this.ebi.run('emboss_backtranseq', obj);
  }
  TRANSEQStatus(jobId: any) {
    return this.ebi.status('emboss_backtranseq', jobId);
  }
  TRANSEQResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_backtranseq', jobId, statusType);
  }

  ETRANSEQ_Run(obj: FormData) {
    return this.ebi.run('emboss_transeq', obj);
  }
  ETRANSEQStatus(jobId: any) {
    return this.ebi.status('emboss_transeq', jobId);
  }
  ETRANSEQResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_transeq', jobId, statusType);
  }

  SEQ_Run(obj: FormData) {
    return this.ebi.run('seqcksum', obj);
  }
  SEQStatus(jobId: any) {
    return this.ebi.status('seqcksum', jobId);
  }
  SEQResult(jobId: any, statusType: any) {
    return this.ebi.result('seqcksum', jobId, statusType);
  }

  ISOCHORE_Run(obj: FormData) {
    return this.ebi.run('emboss_isochore', obj);
  }
  ISOCHOREStatus(jobId: any) {
    return this.ebi.status('emboss_isochore', jobId);
  }
  ISOCHOREResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_isochore', jobId, statusType);
  }

  CPGPLOt_Run(obj: FormData) {
    return this.ebi.run('emboss_cpgplot', obj);
  }
  CPGPLOtStatus(jobId: any) {
    return this.ebi.status('emboss_cpgplot', jobId);
  }
  CPGPLOtResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_cpgplot', jobId, statusType);
  }

  genewise_Run(obj: FormData) {
    return this.ebi.run('genewise', obj);
  }
  genewiseStatus(jobId: any) {
    return this.ebi.status('genewise', jobId);
  }
  genewiseResult(jobId: any, statusType: any) {
    return this.ebi.result('genewise', jobId, statusType);
  }

  EMB_Run(obj: FormData) {
    return this.ebi.run('emboss_seqret', obj);
  }
  EMBStatus(jobId: any) {
    return this.ebi.status('emboss_seqret', jobId);
  }
  EMBResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_seqret', jobId, statusType);
  }

  PSI_Run(obj: FormData) {
    return this.ebi.run('psiblast', obj);
  }
  PSIStatus(jobId: any) {
    return this.ebi.status('psiblast', jobId);
  }
  PSIResult(jobId: any, statusType: any) {
    return this.ebi.result('psiblast', jobId, statusType);
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

  emboss_pepstats_Run(obj: FormData) {
    return this.ebi.run('emboss_pepstats', obj);
  }
  getEmboss_pepstatsStatus(jobId: any) {
    return this.ebi.status('emboss_pepstats', jobId);
  }
  getEmboss_pepstatsResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_pepstats', jobId, statusType);
  }

  emboss_pepwindow_Run(obj: FormData) {
    return this.ebi.run('emboss_pepwindow', obj);
  }
  getEmboss_pepwindowStatus(jobId: any) {
    return this.ebi.status('emboss_pepwindow', jobId);
  }
  getEmboss_pepwindowResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_pepwindow', jobId, statusType);
  }

  emboss_statists_Run(obj: FormData) {
    return this.ebi.run('saps', obj);
  }
  getEmboss_statistsStatus(jobId: any) {
    return this.ebi.status('saps', jobId);
  }
  getEmboss_statistsResult(jobId: any, statusType: any) {
    return this.ebi.result('saps', jobId, statusType);
  }

  emboss_water_Run(obj: FormData) {
    return this.ebi.run('emboss_water', obj);
  }
  getEmboss_waterStatus(jobId: any) {
    return this.ebi.status('emboss_water', jobId);
  }
  getEmboss_waterResult(jobId: any, statusType: any) {
    return this.ebi.result('emboss_water', jobId, statusType);
  }

  emboss_pratt_Run(obj: FormData) {
    return this.ebi.run('phobius', obj);
  }
  getEmboss_prattStatus(jobId: any) {
    return this.ebi.status('phobius', jobId);
  }
  getEmboss_prattResult(jobId: any, statusType: any) {
    return this.ebi.result('phobius', jobId, statusType);
  }

  emboss_ebi_Run(obj: FormData) {
    return this.ebi.run('phobius', obj);
  }
  getEmboss_ebitStatus(jobId: any) {
    return this.ebi.status('phobius', jobId);
  }
  getEmboss_ebitResult(jobId: any, statusType: any) {
    return this.ebi.result('phobius', jobId, statusType);
  }
}
