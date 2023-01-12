import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataformatingService {
  baseURL: any;
  constructor(private http: HttpClient , private toaster: ToastrService,) { }
  getformat(format: string) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/' + format;
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(format);
    console.log(body)
    let option: any = {
      body: format,
      oberve: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/xml"
      })
    }
    // return this.http.post(this.baseURL + 'https://www.ebi.ac.uk/Tools/services/rest/' + format, body, { 'headers': headers })
    return this.http.get<any>(url)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError (error.error);
  }


  // getStatus(jobId: any) {
  //   const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/status/' + jobId
  //   return this.http.get(url).pipe(
  //     catchError(this.handleError)
  //   )
  // }
  // Run(obj: FormData) {
  //   let headers = new HttpHeaders({
  //     "Content-Type": "multipart/form-data"
  //   });
  //   let options = { headers: headers };
  //   let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
  //   return this.http.post(url, obj, options).pipe(catchError(this.handleError))

  // }
  // getResult(jobId: any, statusType: any) {
  //   const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/result/' + jobId + '/' + statusType
  //   return this.http.get(url);
  // }




  emboss_sixpack_Run(obj: FormData) {
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_sixpack/run";
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    return this.http.post(url, obj, options)
  }
  getEmboss_SixpackStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_sixpack/status/' + jobId
    return this.http.get(url);
  }
  getEmboss_sixpackResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_sixpack/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }



  phylogency_Run(obj: FormData) {
    let url = "https://www.ebi.ac.uk/Tools/services/rest/simple_phylogeny/run";
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    return this.http.post(url, obj, options)
  }
  getPhylogencyStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/simple_phylogeny/status/' + jobId
    return this.http.get(url);
  }
  getPhylogencyResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_sixpack/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  ncbiblast_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/run";
    return this.http.post(url, obj, options)
  }
  getncbiblastStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/' + jobId
    return this.http.get(url);
  }

  getncbiblastResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }




  FASTM_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/fastm/run";
    return this.http.post(url, obj, options)
  }
  FASTMStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/fastm/status/' + jobId
    return this.http.get(url);
  }

 FASTMResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/fastm/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }




  FASTA_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/fasta/run";
    return this.http.post(url, obj, options)
  }
  FASTAStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/fasta/status/' + jobId
    return this.http.get(url);
  }

 FASTAResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/fasta/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  NewCPG_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_newcpgreport/run";
    return this.http.post(url, obj, options)
  }
  NewCPGStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_newcpgreport/status/' + jobId
    return this.http.get(url);
  }

  NewCPGResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_newcpgreport/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  TRANSEQ_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/run";
    return this.http.post(url, obj, options)
  }
  TRANSEQStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/status/' + jobId
    return this.http.get(url);
  }

  TRANSEQResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_backtranseq/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }



  ETRANSEQ_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_transeq/run";
    return this.http.post(url, obj, options)
  }
  ETRANSEQStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_transeq/status/' + jobId
    return this.http.get(url);
  }

  ETRANSEQResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_transeq/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }



 SEQ_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/seqcksum/run";
    return this.http.post(url, obj, options)
  }
  SEQStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/seqcksum/status/' + jobId
    return this.http.get(url);
  }

  SEQResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/seqcksum/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }



  ISOCHORE_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/run";
    return this.http.post(url, obj, options)
  }
  ISOCHOREStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/status/' + jobId
    return this.http.get(url);
  }

  ISOCHOREResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  CPGPLOt_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/run";
    return this.http.post(url, obj, options)
  }
  CPGPLOtStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/status/' + jobId
    return this.http.get(url);
  }

  CPGPLOtResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_isochore/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }



  genewise_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/genewise/run";
    return this.http.post(url, obj, options)
  }
  genewiseStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/genewise/status/' + jobId
    return this.http.get(url);
  }

  genewiseResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/genewise/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  EMB_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
    return this.http.post(url, obj, options)
  }
  EMBStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/status/' + jobId
    return this.http.get(url);
  }

  EMBResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  PSI_Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/psiblast/run";
    return this.http.post(url, obj, options)
  }
  PSIStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/psiblast/status/' + jobId
    return this.http.get(url);
  }

  PSIResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/psiblast/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }




  emboss_pepinfo_Run(obj: FormData) {
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_pepinfo/run";
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    return this.http.post(url, obj, options)
  }
  getEmboss_pepinfoStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_pepinfo/status/' + jobId
    return this.http.get(url);
  }
  getEmboss_pepinfoResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_pepinfo/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }


  emboss_pepstats_Run(obj: FormData) {
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_pepstats/run";
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    return this.http.post(url, obj, options)
  }
  getEmboss_pepstatsStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_pepstats/status/' + jobId
    return this.http.get(url);
  }
  getEmboss_pepstatsResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_pepstats/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }
}
