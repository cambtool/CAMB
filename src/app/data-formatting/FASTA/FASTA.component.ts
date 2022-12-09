import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataformatingService } from '../dataformating.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-FASTA',
  templateUrl: './FASTA.component.html',
  styleUrls: ['./FASTA.component.css']
})
export class FASTAComponent implements OnInit {

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
  annotfeats:any=[];
  annotsym:any=[];
  dbrange:any=[];
  seqrange:any=[];
  filter:any=[];
  transltable:any=[];
  database:any=[];
  ktup:any=[];
  sequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient ,private toaster: ToastrService,public dialog: MatDialog) { }
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
    annotfeats: new FormControl(''),
    annotsym: new FormControl(''),
    dbrange: new FormControl(''),
    seqrange: new FormControl(''),
    filter: new FormControl(''),
    transltable: new FormControl(''),
    sequence: new FormControl(''),
    database: new FormControl(''),
    ktup: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),


  });
  async ngOnInit() {
    this.program = await this.service.getformat('fasta/parameterdetails/program').toPromise();
    this.stype = await this.service.getformat('fasta/parameterdetails/stype').toPromise();
    this.matrix = await this.service.getformat('fasta/parameterdetails/matrix').toPromise();
    this.match_scores = await this.service.getformat('fasta/parameterdetails/match_scores').toPromise();
    this.gapopen = await this.service.getformat('fasta/parameterdetails/gapopen').toPromise();
    this.gapext = await this.service.getformat('fasta/parameterdetails/gapext').toPromise();
    this.hsps = await this.service.getformat('fasta/parameterdetails/hsps').toPromise();
    this.expupperlim = await this.service.getformat('fasta/parameterdetails/expupperlim').toPromise();
    this.explowlim = await this.service.getformat('fasta/parameterdetails/explowlim').toPromise();
    this.strand = await this.service.getformat('fasta/parameterdetails/strand').toPromise();
    this.hist = await this.service.getformat('fasta/parameterdetails/hist').toPromise();
    this.scores = await this.service.getformat('fasta/parameterdetails/scores').toPromise();
    this.alignments = await this.service.getformat('fasta/parameterdetails/alignments').toPromise();
    this.scoreformat = await this.service.getformat('fasta/parameterdetails/scoreformat').toPromise();
    this.stats = await this.service.getformat('fasta/parameterdetails/stats').toPromise();
    this.annotfeats = await this.service.getformat('fasta/parameterdetails/annotfeats').toPromise();
    this.annotsym = await this.service.getformat('fasta/parameterdetails/annotsym').toPromise();
    this.dbrange = await this.service.getformat('fasta/parameterdetails/dbrange').toPromise();
    this.seqrange = await this.service.getformat('fasta/parameterdetails/seqrange').toPromise();
    this.filter = await this.service.getformat('fasta/parameterdetails/filter').toPromise();
    this.transltable = await this.service.getformat('fasta/parameterdetails/transltable').toPromise();
    this.database = await this.service.getformat('fasta/parameterdetails/database').toPromise();
    this.ktup = await this.service.getformat('fasta/parameterdetails/ktup').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFCSSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLGLENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWNSLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQLPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHNAIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLGLTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDNGLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGPLQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDCGCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEAHFAPC");
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.asequence.setValue('');
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
    // let url = "https://www.ebi.ac.uk/Tools/services/rest/fasta/run";
    // this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));

    this.service.FASTA_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.service.FASTAStatus(this.jobId).subscribe(
              data => {
                this.toaster.success(data.toString())
              }, (error) => {
                if (error.status == 200) {
                  this.jobStatus = error.error.text
                  this.toaster.info(this.jobStatus)
                  setTimeout(() => {
                    // if (this.jobStatus != "FAILURE") {
                    this.service.FASTAResult(this.jobId, 'out').subscribe(
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
