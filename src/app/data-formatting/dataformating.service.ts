import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataformatingService {

  constructor(private http: HttpClient) { }
  getformat(format: string) {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/parameterdetails/' + format;
    return this.http.get<any>(url)
  }
  // getoutputformat() {
  //   const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/parameterdetails/outputformat';
  //   return this.http.get<any>(url)
  // }
  // postData() {
  //     return this.http.post<any>(
  //         this.rootUrl + "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run",
  //         sortedtasks
  //     );
  // }
}
