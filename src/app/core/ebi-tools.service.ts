import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbiToolsService {
  private readonly baseUrl = environment.ebiToolsBaseUrl;

  constructor(private http: HttpClient) { }

  getResource(path: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + path);
  }

  run(tool: string, body: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.baseUrl + tool + '/run', body, { headers });
  }

  status(tool: string, jobId: any): Observable<any> {
    return this.http.get(this.baseUrl + tool + '/status/' + jobId);
  }

  result(tool: string, jobId: any, resultType: any): Observable<any> {
    return this.http.get(this.baseUrl + tool + '/result/' + jobId + '/' + resultType);
  }
}
