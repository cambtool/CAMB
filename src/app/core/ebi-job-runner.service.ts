import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ResultComponent } from '../data-formatting/result/result.component';

export interface EbiJobRequest {
  run: Observable<any>;
  status: (jobId: string) => Observable<any>;
  result: (jobId: string) => Observable<any>;
  pollDelayMs: number;
  toaster: ToastrService;
  dialog: MatDialog;
  setLoading: (loading: boolean) => void;
  onJobId?: (jobId: string) => void;
  onStatus?: (status: string) => void;
}

@Injectable({
  providedIn: 'root'
})
export class EbiJobRunnerService {
  submit(request: EbiJobRequest): Subscription {
    const subscription = new Subscription();
    const runSub = request.run.subscribe(
      () => undefined,
      (error) => {
        if (error.status == 200) {
          const jobId = error.error.text;
          if (request.onJobId) {
            request.onJobId(jobId);
          }
          if (jobId != null) {
            this.poll(jobId, request, subscription);
          }
        } else {
          request.toaster.error(error.error);
        }
      }
    );
    subscription.add(runSub);
    return subscription;
  }

  private poll(jobId: string, request: EbiJobRequest, subscription: Subscription): void {
    request.setLoading(true);
    const pollSub = timer(request.pollDelayMs).pipe(
      mergeMap(() => request.status(jobId))
    ).subscribe(
      () => undefined,
      (error) => {
        if (error.status == 200) {
          const jobStatus = error.error.text;
          if (request.onStatus) {
            request.onStatus(jobStatus);
          }
          request.toaster.info(jobStatus);
          if (jobStatus != 'RUNNING') {
            this.loadResult(jobId, request, subscription);
          } else {
            this.poll(jobId, request, subscription);
          }
        } else {
          request.toaster.error(error.error);
          this.poll(jobId, request, subscription);
        }
      }
    );
    subscription.add(pollSub);
  }

  private loadResult(jobId: string, request: EbiJobRequest, subscription: Subscription): void {
    const resultSub = request.result(jobId).subscribe(
      () => undefined,
      (error) => {
        if (error.status == 200) {
          request.setLoading(false);
          request.dialog.open(ResultComponent, {
            data: {
              text: error.error.text
            },
            width: '760px',
            maxWidth: '94vw',
            panelClass: 'result-dialog'
          });
        } else {
          request.toaster.error(error.error);
          this.poll(jobId, request, subscription);
        }
      }
    );
    subscription.add(resultSub);
  }
}
