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
  selector: 'app-PSI_blast',
  templateUrl: './PSI_blast.component.html',
  styleUrls: ['./PSI_blast.component.css']
})
export class PSI_blastComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  currentSub: Subscription | undefined;
  show3 = false;
  isSubmitted = false;
  jobId: any;
  jobStatus: any;
  matrix: any = []
  gapopen: any = []
  gapext: any = []
  psithr: any = []
  expthr: any = []
  scores: any = []
  showLoader: boolean = false;
  alignments: any = []
  alignView: any = []
  dropoff: any = []
  finaldropoff: any = []
  filter: any = []
  database: any = []
  previousjobid: any = []
  selectedHits: any = []
  cpfile: any = []
  patfile: any = []
  seqrange: any = []
  data: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient ,private toaster: ToastrService,public dialog: MatDialog) { }
  registrationForm = this.fb.group({
    matrix: new FormControl(''),
    gapopen: new FormControl(''),
    gapext: new FormControl(''),
    psithr: new FormControl(''),
    expthr: new FormControl(''),
    scores: new FormControl(''),
    alignments: new FormControl(''),
    alignView: new FormControl(''),
    dropoff: new FormControl(''),
    finaldropoff: new FormControl(''),
    filter: new FormControl(''),
    database: new FormControl(''),
    previousjobid: new FormControl(''),
    selectedHits: new FormControl(''),
    cpfile: new FormControl(''),
    patfile: new FormControl(''),
    seqrange: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    sequence: new FormControl(''),

  });
  async ngOnInit() {
    this.matrix = await this.service.getformat('psiblast/parameterdetails/matrix').toPromise();
    this.gapopen = await this.service.getformat('psiblast/parameterdetails/gapopen').toPromise();
    this.gapext = await this.service.getformat('psiblast/parameterdetails/gapext').toPromise();
    this.expthr = await this.service.getformat('psiblast/parameterdetails/expthr').toPromise();
    this.psithr = await this.service.getformat('psiblast/parameterdetails/psithr').toPromise();
    this.scores = await this.service.getformat('psiblast/parameterdetails/scores').toPromise();
    this.alignments = await this.service.getformat('psiblast/parameterdetails/alignments').toPromise();
    this.alignView = await this.service.getformat('psiblast/parameterdetails/alignView').toPromise();
    this.dropoff = await this.service.getformat('psiblast/parameterdetails/dropoff').toPromise();
    this.finaldropoff = await this.service.getformat('psiblast/parameterdetails/finaldropoff').toPromise();
    this.filter = await this.service.getformat('psiblast/parameterdetails/filter').toPromise();
    this.database = await this.service.getformat('psiblast/parameterdetails/database').toPromise();
    this.previousjobid = await this.service.getformat('psiblast/parameterdetails/previousjobid').toPromise();
    this.selectedHits = await this.service.getformat('psiblast/parameterdetails/selectedHits').toPromise();
    this.cpfile = await this.service.getformat('psiblast/parameterdetails/cpfile').toPromise();
    this.patfile = await this.service.getformat('psiblast/parameterdetails/patfile').toPromise();
    this.seqrange = await this.service.getformat('psiblast/parameterdetails/seqrange').toPromise();

  }
  toggle() {
    this.registrationForm.controls.sequence.setValue(`MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFCSSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLGLENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWNSLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQLPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHNAIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLGLTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDNGLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGPLQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDCGCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEAHFAPC`);
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
    formdata.append("database", this.registrationForm.get('database')?.value);
    formdata.append("matrix", this.registrationForm.get('matrix')?.value);
    formdata.append("gapopen", this.registrationForm.get('gapopen')?.value);
    formdata.append("gapext", this.registrationForm.get('gapext')?.value);
    formdata.append("expthr", this.registrationForm.get('expthr')?.value);
    formdata.append("psithr", this.registrationForm.get('psithr')?.value);
    formdata.append("scores", this.registrationForm.get('scores')?.value);
    formdata.append("alignments", this.registrationForm.get('alignments')?.value);
    formdata.append("alignView", this.registrationForm.get('alignView')?.value);
    formdata.append("dropoff", this.registrationForm.get('dropoff')?.value);
    formdata.append("finaldropoff", this.registrationForm.get('finaldropoff')?.value);
    formdata.append("filter", this.registrationForm.get('filter')?.value);
    formdata.append("previousjobid", this.registrationForm.get('previousjobid')?.value);
    formdata.append("selectedHits", this.registrationForm.get('selectedHits')?.value);
    formdata.append("cpfile", this.registrationForm.get('cpfile')?.value);
    formdata.append("patfile", this.registrationForm.get('patfile')?.value);
    formdata.append("seqrange", this.registrationForm.get('seqrange')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.service.PSI_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            // this.service.PSIStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         this.service.PSIResult(this.jobId, 'out').subscribe(
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
            this.getResult()
          }
        } else {
          this.toaster.error(error.error)
        }
      })

  }
  getResult() {
    this.showLoader = true;
    this.currentSub = timer(10000).pipe(
      mergeMap(() => 
      this.service.PSIStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.PSIResult(this.jobId, 'out').subscribe(
            (response:any)=>{
              console.log(response);
              // this.message_arr = response.resp;
            },(error)=>{
              console.log(error);
              if (error.status == 200) {
                this.showLoader = false;
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
          if (this.jobStatus == "RUNNING") {
            this.getResult()
          }
          else {
            this.showLoader = false;
            this.currentSub?.unsubscribe()
          }
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
