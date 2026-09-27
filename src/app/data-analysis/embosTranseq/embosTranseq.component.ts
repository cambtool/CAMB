import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-embosTranseq',
  templateUrl: './embosTranseq.component.html',
  styleUrls: ['./embosTranseq.component.css']
})
export class EmbosTranseqComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader : boolean = false
  isSubmitted = false;
  currentSub: Subscription | undefined;
  jobId: any;
  jobStatus: any
  frame: any = [];
  regions: any = [];
  codontable:any=[];
  reverse:any=[];
  trim:any=[];
  sequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService ,private toaster: ToastrService,public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
  registrationForm = this.fb.group({

    frame: new FormControl(''),
    codontable: new FormControl(''),
    regions: new FormControl(''),
    trim: new FormControl(''),
    reverse: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    sequence: new FormControl(''),

  });
  async ngOnInit() {
    this.frame = await this.service.getformat('emboss_transeq/parameterdetails/frame').toPromise();
    this.codontable = await this.service.getformat('emboss_transeq/parameterdetails/codontable').toPromise();
    this.regions = await this.service.getformat('emboss_transeq/parameterdetails/regions').toPromise();
    this.trim = await this.service.getformat('emboss_transeq/parameterdetails/trim').toPromise();
    this.reverse = await this.service.getformat('emboss_transeq/parameterdetails/reverse').toPromise();


  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCTGGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCTGGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACTACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCTGCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCTGCCCATCAACGGCAACGGCAAGCAGTAG ");
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
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("frame", this.registrationForm.get('frame')?.value);
    formdata.append("codontable", this.registrationForm.get('codontable')?.value);
    formdata.append("regions", this.registrationForm.get('regions')?.value);
    formdata.append("trim", this.registrationForm.get('trim')?.value);
    formdata.append("reverse", this.registrationForm.get('reverse')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.ETRANSEQ_Run(formdata),
      status: (jobId) => this.service.ETRANSEQStatus(jobId),
      result: (jobId) => this.service.ETRANSEQResult(jobId, 'out'),
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
