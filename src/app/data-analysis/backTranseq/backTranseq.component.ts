import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-backTranseq',
  templateUrl: './backTranseq.component.html',
  styleUrls: ['./backTranseq.component.css']
})
export class BackTranseqComponent implements OnInit {

  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader: boolean = false
  isSubmitted = false;
  jobId: any;
  currentSub: Subscription | undefined;
  jobStatus: any;
  codontable: any = [];
  sequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
  registrationForm = this.fb.group({
    codontable: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    sequence: new FormControl(''),

  });
  async ngOnInit() {
    this.codontable = await this.service.getformat('emboss_backtranseq/parameterdetails/codontable').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG KKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTP AVHASLDKFLASVSTVLTSKYR MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHG KKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTP AVHASLDKFLASVSTVLTSKYR MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHG SKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTA DAHAAWDKFLSIVSGVLTEKYR ");
  }
  checkbox() {
    this.show3 = toggleFlag(this.show3);
  }
  handleClear() {
    clearControl(this.registrationForm, 'asequence');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("codontable", this.registrationForm.get('codontable')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("title", this.registrationForm.get('fratitleme')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.TRANSEQ_Run(formdata),
      status: (jobId) => this.service.TRANSEQStatus(jobId),
      result: (jobId) => this.service.TRANSEQResult(jobId, 'out'),
      pollDelayMs: 20000,
      toaster: this.toaster,
      dialog: this.dialog,
      setLoading: (loading) => this.showLoader = loading,
      onJobId: (jobId) => this.jobId = jobId,
      onStatus: (status) => this.jobStatus = status,
    });
  }

  ngOnDestroy() {
    this.currentSub?.unsubscribe();
  }
}
