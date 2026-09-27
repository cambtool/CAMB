import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleMoreOptions, toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-pratt',
  templateUrl: './pratt.component.html',
  styleUrls: ['./pratt.component.css']
})
export class PrattComponent implements OnInit {

  sequence: any = [];

  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  currentSub: Subscription | undefined;
  showLoader: boolean = false
  isSubmitted = false;
  format:any =[];
  stype:any =[];
  data: any = [];
  public buttonName: any = 'More option...';
  jobStatus: any;
  jobId: any;
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
     registrationForm = this.fb.group({
    sequence: new FormControl(''),
    format:new FormControl(''),
    stype:new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
  });
  async ngOnInit() {
    this.format = await this.service.getformat('/phobius/parameterdetails/format').toPromise();
    this.stype = await this.service.getformat('/phobius/parameterdetails/stype').toPromise();
  }
  toggle() {
    // this.show = !this.show;
    this.registrationForm.controls.sequence.setValue(`>sp|P69905|HBA_HUMAN Hemoglobin subunit alpha OS=Homo sapiens GN=HBA1 PE=1 SV=2
    MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG
    KKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTP
    AVHASLDKFLASVSTVLTSKYR
    >sp|P01942|HBA_MOUSE Hemoglobin subunit alpha OS=Mus musculus GN=Hba PE=1 SV=2
    MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHG
    KKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTP
    AVHASLDKFLASVSTVLTSKYR
    >sp|P13786|HBAZ_CAPHI Hemoglobin subunit zeta OS=Capra hircus GN=HBZ1 PE=3 SV=2
    MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHG
    SKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTA
    DAHAAWDKFLSIVSGVLTEKYR  `);
  }
  toggleinput() {
    const more = toggleMoreOptions(this.show2);
    this.show2 = more.show;
    this.buttonName = more.label;
  }
  checkbox() {
    this.show3 = toggleFlag(this.show3);
  }
  handleClear() {
    clearControl(this.registrationForm, 'sequence');
  }


  get cityName() {
    return this.registrationForm.get('cityName');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.emboss_pratt_Run(formdata),
      status: (jobId) => this.service.getEmboss_prattStatus(jobId),
      result: (jobId) => this.service.getEmboss_prattResult(jobId, 'out'),
      pollDelayMs: 10000,
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

