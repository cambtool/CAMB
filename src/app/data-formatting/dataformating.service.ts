import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataformatingService {
  baseURL: any;
  constructor(private http: HttpClient) { }
  getformat(format: string) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/' + format;
    // const headers = { 'content-type': 'application/json' }
    // const body = JSON.stringify(format);
    // console.log(body)
    // let option: any = {
    //   body: format,
    //   oberve: "response",
    //   responseType: "blob",
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Accept": "application/xml"
    //   })
    // }
    // return this.http.post(this.baseURL + 'https://www.ebi.ac.uk/Tools/services/rest/' + format, body, { 'headers': headers })
    return this.http.get<any>(url)
  }
  getStatus(jobId: any) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/status/' + jobId
    return this.http.get(url);
  }
  Run(obj: FormData) {
    let headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    let options = { headers: headers };
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
    return this.http.post(url, obj, options)
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
}
