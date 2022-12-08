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


  getStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/status/' + jobId
    return this.http.get(url).pipe(
      catchError(this.handleError)
    )
  }
  Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
    return this.http.post(url, obj, options).pipe(catchError(this.handleError))

  }
  getResult(jobId: any, statusType: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/result/' + jobId + '/' + statusType
    return this.http.get(url);
  }
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



}
