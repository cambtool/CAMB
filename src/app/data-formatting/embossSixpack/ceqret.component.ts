import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from '../dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleMoreOptions, toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-ceqret',
  templateUrl: './ceqret.component.html',
  styleUrls: ['./ceqret.component.css']
})
export class CeqretComponent implements OnInit {
  sequence: any = [];
  lastorf: any = [];
  name = '';
  show: boolean = false;
  currentSub: Subscription | undefined;
  show2 = false;
  show3 = false;
  showLoader: boolean = false
  isSubmitted = false;
  codontable: any = [];
  reverse: any = [];
  orfminsize: any = [];
  firstorf: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobStatus: any;
  jobId: any;
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    lastorf: new FormControl(''),
    codontable: new FormControl(''),
    reverse: new FormControl(''),
    orfminsize: new FormControl(''),
    firstorf: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
  });
  async ngOnInit() {
    this.codontable = await this.service.getformat('emboss_sixpack/parameterdetails/codontable').toPromise();
    this.firstorf = await this.service.getformat('emboss_sixpack/parameterdetails/firstorf').toPromise();
    this.lastorf = await this.service.getformat('emboss_sixpack/parameterdetails/lastorf').toPromise();
    this.reverse = await this.service.getformat('emboss_sixpack/parameterdetails/reverse').toPromise();
    this.orfminsize = await this.service.getformat('emboss_sixpack/parameterdetails/orfminsize').toPromise();
    // this.sequence = await this.service.getformat('emboss_sixpack/parameterdetails/sequence').toPromise();
    // this.outputcase = await this.service.getformat('parameterdetails/outputcase').toPromise();
    // this.seqrange = await this.service.getformat('parameterdetails/seqrange').toPromise();
  }
  toggle() {
    // this.show = !this.show;
    this.registrationForm.controls.sequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
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
    formdata.append("lastorf", this.registrationForm.get('lastorf')?.value);
    formdata.append("codontable", this.registrationForm.get('codontable')?.value);
    formdata.append("reverse", this.registrationForm.get('reverse')?.value);
    formdata.append("orfminsize", this.registrationForm.get('orfminsize')?.value);
    formdata.append("firstorf", this.registrationForm.get('firstorf')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.emboss_sixpack_Run(formdata),
      status: (jobId) => this.service.getEmboss_SixpackStatus(jobId),
      result: (jobId) => this.service.getEmboss_sixpackResult(jobId, 'out'),
      pollDelayMs: 15000,
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
