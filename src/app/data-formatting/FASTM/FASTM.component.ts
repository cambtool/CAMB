import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    // let url = "https://www.ebi.ac.uk/Tools/services/rest/fastm/run";
    // this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));
    this.service.FASTM_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.service.FASTMStatus(this.jobId).subscribe(
              data => {
                this.toaster.success(data.toString())
              }, (error) => {
                if (error.status == 200) {
                  this.jobStatus = error.error.text
                  this.toaster.info(this.jobStatus)
                  setTimeout(() => {
                    // if (this.jobStatus != "FAILURE") {
                    this.service.FASTMResult(this.jobId, 'out').subscribe(
                      success => {
                        console.log(success);
                      },
                      error => {
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
                        }
                      }
                    )
                    // }
                  }, 15000);
                }
                else {
                  this.toaster.error(error.error)
                }
              }
            )
          }
        } else {
          this.toaster.error(error.error)
        }
      })
  }

}
