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
}
