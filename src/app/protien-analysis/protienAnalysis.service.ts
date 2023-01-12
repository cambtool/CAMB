import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProtienAnalysisService {

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
}
