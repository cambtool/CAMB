import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-embossSeqret',
  templateUrl: './embossSeqret.component.html',
  styleUrls: ['./embossSeqret.component.css']
})
export class EmbossSeqretComponent implements OnInit {
  inputformat: any = [];
  outputformat: any = [];
  name = '';
  currentSub: Subscription | undefined
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader: boolean = false
  isSubmitted = false;
  stypeList: any = [];
  feature: any = [];
  firstonly: any = [];
  reverse: any = [];
  outputcase: any = [];
  seqrange: any = [];
  data: any = [];
  jobId: any = '';
  jobStatus: string = '';
  public buttonName: any = 'More option...';

  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) {

  }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    stype: new FormControl(''),
    inputformat: new FormControl(''),
    outputformat: new FormControl(''),
    feature: new FormControl(''),
    firstonly: new FormControl(''),
    reverse: new FormControl(''),
    outputcase: new FormControl(''),
    seqrange: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),

  });
  async ngOnInit() {
    this.stypeList = await this.service.getformat('emboss_seqret/parameterdetails/stype').toPromise();
    console.log(this.stypeList);
    
    // this.stypeList.values?.values.forEach((element:any) => {
    //   if(element.defaultValue == true) {
    //     this.registrationForm.get("stype")?.setValue(element.value);
    //   }
    // });
    this.inputformat = await this.service.getformat('emboss_seqret/parameterdetails/inputformat').toPromise();
    this.outputformat = await this.service.getformat('emboss_seqret/parameterdetails/outputformat').toPromise();
    this.feature = await this.service.getformat('emboss_seqret/parameterdetails/feature').toPromise();
    this.firstonly = await this.service.getformat('emboss_seqret/parameterdetails/firstonly').toPromise();
    this.reverse = await this.service.getformat('emboss_seqret/parameterdetails/reverse').toPromise();
    this.outputcase = await this.service.getformat('emboss_seqret/parameterdetails/outputcase').toPromise();
    this.seqrange = await this.service.getformat('emboss_seqret/parameterdetails/seqrange').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
  }
  checkbox() {
    this.show3 = toggleFlag(this.show3);
  }
  handleClear() {
    clearControl(this.registrationForm, 'sequence');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    console.log(this.registrationForm.value);

    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("stype", this.registrationForm.get('stype')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    formdata.append("inputformat", this.registrationForm.get('inputformat')?.value);
    formdata.append("outputformat", this.registrationForm.get('outputformat')?.value);
    formdata.append("feature", this.registrationForm.get('feature')?.value);
    formdata.append("firstonly", this.registrationForm.get('firstonly')?.value);
    formdata.append("reverse", this.registrationForm.get('reverse')?.value);
    formdata.append("outputcase", this.registrationForm.get('outputcase')?.value);
    formdata.append("seqrange", this.registrationForm.get('seqrange')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);


    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.EMB_Run(formdata),
      status: (jobId) => this.service.EMBStatus(jobId),
      result: (jobId) => this.service.EMBResult(jobId, 'out'),
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

