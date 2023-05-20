import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { ResultComponent } from 'src/app/data-formatting/result/result.component';

@Component({
  selector: 'app-geneWise',
  templateUrl: './geneWise.component.html',
  styleUrls: ['./geneWise.component.css']
})
export class GeneWiseComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader: boolean = false
  currentSub: Subscription | undefined;
  isSubmitted = false;
  jobId: any;
  jobStatus: any;
  para: any = [];
  pretty: any = [];
  genes: any = [];
  trans: any = [];
  cdna: any = [];
  embl: any = [];
  ace: any = [];
  gff: any = [];
  diana: any = [];
  init: any = [];
  splice: any = [];
  random: any = [];
  alg: any = [];
  asequence: any = [];
  bsequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient, private toaster: ToastrService, public dialog: MatDialog) { }
  registrationForm = this.fb.group({

    para: new FormControl(''),
    pretty: new FormControl(''),
    genes: new FormControl(''),
    trans: new FormControl(''),
    cdna: new FormControl(''),
    embl: new FormControl(''),
    ace: new FormControl(''),
    gff: new FormControl(''),
    diana: new FormControl(''),
    init: new FormControl(''),
    splice: new FormControl(''),
    random: new FormControl(''),
    alg: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    asequence: new FormControl(''),
    bsequence: new FormControl(''),

  });
  async ngOnInit() {
    this.para = await this.service.getformat('genewise/parameterdetails/para').toPromise();
    this.pretty = await this.service.getformat('genewise/parameterdetails/pretty').toPromise();
    this.genes = await this.service.getformat('genewise/parameterdetails/genes').toPromise();
    this.trans = await this.service.getformat('genewise/parameterdetails/trans').toPromise();
    this.cdna = await this.service.getformat('genewise/parameterdetails/cdna').toPromise();
    this.embl = await this.service.getformat('genewise/parameterdetails/embl').toPromise();
    this.ace = await this.service.getformat('genewise/parameterdetails/ace').toPromise();
    this.gff = await this.service.getformat('genewise/parameterdetails/gff').toPromise();
    this.alg = await this.service.getformat('genewise/parameterdetails/alg').toPromise();
    this.diana = await this.service.getformat('genewise/parameterdetails/diana').toPromise();
    this.init = await this.service.getformat('genewise/parameterdetails/init').toPromise();
    this.splice = await this.service.getformat('genewise/parameterdetails/splice').toPromise();
    this.random = await this.service.getformat('genewise/parameterdetails/random').toPromise();
  }
  toggle() {
    this.registrationForm.controls.asequence.setValue("MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFCSSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLGLENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWNSLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQLPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHNAIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLGLTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDNGLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGPLQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDCGCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEAHFAPC");
    this.registrationForm.controls.bsequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCTGGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCTGGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACTACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCTGCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCTGCCCATCAACGGCAACGGCAAGCAGTAG  ");
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
    formdata.append("asequence", this.registrationForm.get('asequence')?.value);
    formdata.append("bsequence", this.registrationForm.get('bsequence')?.value);
    formdata.append("para", this.registrationForm.get('para')?.value);
    formdata.append("pretty", this.registrationForm.get('pretty')?.value);
    formdata.append("genes", this.registrationForm.get('genes')?.value);
    formdata.append("trans", this.registrationForm.get('trans')?.value);
    formdata.append("cdna", this.registrationForm.get('cdna')?.value);
    formdata.append("embl", this.registrationForm.get('embl')?.value);
    formdata.append("ace", this.registrationForm.get('ace')?.value);
    formdata.append("gff", this.registrationForm.get('gff')?.value);
    formdata.append("alg", this.registrationForm.get('alg')?.value);
    formdata.append("diana", this.registrationForm.get('diana')?.value);
    formdata.append("init", this.registrationForm.get('init')?.value);
    formdata.append("splice", this.registrationForm.get('splice')?.value);
    formdata.append("random", this.registrationForm.get('random')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    // let url = "https://www.ebi.ac.uk/Tools/services/rest/genewise/run";
    // this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));

    this.service.genewise_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.getResult();
            // this.service.genewiseStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         // if (this.jobStatus != "FAILURE") {
            //         this.service.genewiseResult(this.jobId, 'out').subscribe(
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
            //         // }
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
  getResult(){
    this.showLoader = true

    this.currentSub = timer(20000).pipe(
      mergeMap(() => 
      this.service.genewiseStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.genewiseResult(this.jobId, 'out').subscribe(
            (response:any)=>{
              console.log(response);
              // this.message_arr = response.resp;
            },(error)=>{
              console.log(error);
              if (error.status == 200) {
                this.showLoader = false
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
