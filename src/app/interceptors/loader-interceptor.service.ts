import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LoaderService } from '../Loader.service';

@Injectable({
  providedIn: 'root'
})

export class LoaderInterceptorService {
  private requests: HttpRequest<any>[] = [];


  constructor(private loaderService: LoaderService, private spinner: NgxSpinnerService) { }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    // console.log(i, this.requests.length);
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpRequest<any> = req;
    // for (const key of headers.headers.keys()) {
    //   if (key == "submit-spinner") {
    //     this.spinner.show();

    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 2000);
    //   }
    // }

    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create((observer: any) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
