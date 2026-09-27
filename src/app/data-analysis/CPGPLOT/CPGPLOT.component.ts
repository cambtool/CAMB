import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-CPGPLOT',
  templateUrl: './CPGPLOT.component.html',
  styleUrls: ['./CPGPLOT.component.css']
})
export class CPGPLOTComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader: boolean = false
  isSubmitted = false;
  currentSub: Subscription | undefined;
  jobId: any;
  jobStatus: any;
  window: any = [];
  minlen: any = [];
  minoe: any = [];
  minpc: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService,public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),

    window: new FormControl(''),
    minlen: new FormControl(''),
    minoe: new FormControl(''),
    minpc: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),

  });
  async ngOnInit() {
    this.window = await this.service.getformat('emboss_cpgplot/parameterdetails/window').toPromise();
    this.minlen = await this.service.getformat('emboss_cpgplot/parameterdetails/minlen').toPromise();
    this.minoe = await this.service.getformat('emboss_cpgplot/parameterdetails/minoe').toPromise();
    this.minpc = await this.service.getformat('emboss_cpgplot/parameterdetails/minpc').toPromise();


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
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("window", this.registrationForm.get('window')?.value);
    formdata.append("minlen", this.registrationForm.get('minlen')?.value);
    formdata.append("minoe", this.registrationForm.get('minoe')?.value);
    formdata.append("minpc", this.registrationForm.get('minpc')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.CPGPLOt_Run(formdata),
      status: (jobId) => this.service.CPGPLOtStatus(jobId),
      result: (jobId) => this.service.CPGPLOtResult(jobId, 'out'),
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
