import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DataformatingService } from '../dataformating.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-FASTM',
  templateUrl: './FASTM.component.html',
  styleUrls: ['./FASTM.component.css']
})
export class FASTMComponent implements OnInit {


  name = '';
  show: boolean = false;
  show2 = false;
  currentSub: Subscription | undefined;
  show3 = false;
  isSubmitted = false;
  jobId: any;
  jobStatus: any;
  program: any = [];
  stype: any = [];
  matrix:any=[];
  match_scores:any=[];
  gapopen:any=[];
  gapext:any=[];
  hsps:any=[];
  expupperlim:any=[];
  explowlim:any=[];
  strand:any=[];
  hist:any=[];
  scores:any=[];
  alignments:any=[];
  scoreformat:any=[];
  stats:any=[];
  dbrange:any=[];
  seqrange:any=[];
  filter:any=[];
  database:any=[];
  ktup:any=[];
  sequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient , private toaster: ToastrService,public dialog: MatDialog) { }
  registrationForm = this.fb.group({

    program: new FormControl(''),
    stype: new FormControl(''),
    matrix: new FormControl(''),
    match_scores: new FormControl(''),
    gapopen: new FormControl(''),
    gapext: new FormControl(''),
    hsps: new FormControl(''),
    expupperlim: new FormControl(''),
    explowlim: new FormControl(''),
    strand: new FormControl(''),
    hist: new FormControl(''),
    scores: new FormControl(''),
    alignments: new FormControl(''),
    scoreformat: new FormControl(''),
    stats: new FormControl(''),
    dbrange: new FormControl(''),
    seqrange: new FormControl(''),
    filter: new FormControl(''),
    sequence: new FormControl(''),
    database: new FormControl(''),
    ktup: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),


  });
  async ngOnInit() {
    this.program = await this.service.getformat('fastm/parameterdetails/program').toPromise();
    this.stype = await this.service.getformat('fastm/parameterdetails/stype').toPromise();
    this.matrix = await this.service.getformat('fastm/parameterdetails/matrix').toPromise();
    this.match_scores = await this.service.getformat('fastm/parameterdetails/match_scores').toPromise();
    this.gapopen = await this.service.getformat('fastm/parameterdetails/gapopen').toPromise();
    this.gapext = await this.service.getformat('fastm/parameterdetails/gapext').toPromise();
    this.hsps = await this.service.getformat('fastm/parameterdetails/hsps').toPromise();
    this.expupperlim = await this.service.getformat('fastm/parameterdetails/expupperlim').toPromise();
    this.explowlim = await this.service.getformat('fastm/parameterdetails/explowlim').toPromise();
    this.strand = await this.service.getformat('fastm/parameterdetails/strand').toPromise();
    this.hist = await this.service.getformat('fastm/parameterdetails/hist').toPromise();
    this.scores = await this.service.getformat('fastm/parameterdetails/scores').toPromise();
    this.alignments = await this.service.getformat('fastm/parameterdetails/alignments').toPromise();
    this.scoreformat = await this.service.getformat('fastm/parameterdetails/scoreformat').toPromise();
    this.stats = await this.service.getformat('fastm/parameterdetails/stats').toPromise();
    this.seqrange = await this.service.getformat('fastm/parameterdetails/seqrange').toPromise();
    this.dbrange = await this.service.getformat('fastm/parameterdetails/dbrange').toPromise();
    this.filter = await this.service.getformat('fastm/parameterdetails/filter').toPromise();
    this.database = await this.service.getformat('fastm/parameterdetails/database').toPromise();
    this.ktup = await this.service.getformat('fastm/parameterdetails/ktup').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue(`>P00001
  MPPYTVVY,
  VETWQEGSLK,
  YGQLPKFQDGD,
  VEDLRCKYI,
  GCLDAFPLLSAY,
  GCLDAFPLLSAY,
  VGRLSARPKLKAFL`);
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.sequence.setValue('');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("program", this.registrationForm.get('program')?.value);
    formdata.append("stype", this.registrationForm.get('stype')?.value);
    formdata.append("database", this.registrationForm.get('database')?.value);
    formdata.append("matrix", this.registrationForm.get('matrix')?.value);
    formdata.append("match_scores", this.registrationForm.get('match_scores')?.value);
    formdata.append("gapopen", this.registrationForm.get('gapopen')?.value);
    formdata.append("gapext", this.registrationForm.get('gapext')?.value);
    formdata.append("hsps", this.registrationForm.get('hsps')?.value);
    formdata.append("expupperlim", this.registrationForm.get('expupperlim')?.value);
    formdata.append("explowlim", this.registrationForm.get('explowlim')?.value);
    formdata.append("strand", this.registrationForm.get('strand')?.value);
    formdata.append("hist", this.registrationForm.get('hist')?.value);
    formdata.append("scores", this.registrationForm.get('scores')?.value);
    formdata.append("alignments", this.registrationForm.get('alignments')?.value);
    formdata.append("scoreformat", this.registrationForm.get('scoreformat')?.value);
    formdata.append("stats", this.registrationForm.get('stats')?.value);
    formdata.append("seqrange", this.registrationForm.get('seqrange')?.value);
    formdata.append("dbrange", this.registrationForm.get('dbrange')?.value);
    formdata.append("filter", this.registrationForm.get('filter')?.value);
    formdata.append("ktup", this.registrationForm.get('ktup')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.service.FASTM_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.getResult()
            // this.service.FASTMStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         this.service.FASTMResult(this.jobId, 'out').subscribe(
            //           success => {
            //             console.log(success);
            //           },
            //           error => {
            //             console.log(error);
            //             if (error.status == 200) {
            //               let result = error.error.text;
            //               const dialogRef = this.dialog.open(ResultComponent, {
            //                 data: {
            //                   text: result
            //                 }
            //               });
            //             }else {
            //               this.toaster.error(error.error)
            //             }
            //           }
            //         )
            //       }, 15000);
            //     }
            //     else {
            //       this.toaster.error(error.error)
            //     }
            //   }
            // )
          }
        } else {
          this.toaster.error(error.error)
        }
      })
  }
  getResult() {
    // this.spinner.show()
    this.currentSub = timer(10000).pipe(
      mergeMap(() => 
      this.service.FASTMStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.FASTMResult(this.jobId, 'out').subscribe(
            (response:any)=>{
              console.log(response);
              // this.message_arr = response.resp;
            },(error)=>{
              console.log(error);
              if (error.status == 200) {
                let result = error.error.text;
                const dialogRef = this.dialog.open(ResultComponent, {
                  data: {
                    text: result
                  }
                });
              }else {
                this.toaster.error(error.error)
                this.getResult()
              }
            }
          )
        } else{
          this.getResult()
        }
      }else {
        this.toaster.error(error.error)
        this.getResult()
      }
    });
  }
  ngOnDestroy () {
    this.currentSub?.unsubscribe()
  }
}
