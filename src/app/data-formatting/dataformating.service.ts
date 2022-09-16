import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataformatingService {

  constructor(private http: HttpClient) { }
  getData() {
    const url = 'https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/parameters';
    return this.http.get<any>(url)
  }

  // postData() {
  //     return this.http.post<any>(
  //         this.rootUrl + "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run",
  //         sortedtasks
  //     );
  // }
}
