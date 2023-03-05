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
  selector: 'app-embosTranseq',
  templateUrl: './embosTranseq.component.html',
  styleUrls: ['./embosTranseq.component.css']
})
export class EmbosTranseqComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
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
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient  ,private toaster: ToastrService,public dialog: MatDialog) { }
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
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.asequence.setValue('');
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
    // let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_transeq/run";
    // this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));



    this.service.ETRANSEQ_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.getResult()
            // this.service.ETRANSEQStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         // if (this.jobStatus != "FAILURE") {
            //         this.service.ETRANSEQResult(this.jobId, 'out').subscribe(
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
            //       }, 3000);
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
    // this.spinner.show()

    this.currentSub = timer(20000).pipe(
      mergeMap(() => 
      this.service.ETRANSEQStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.ETRANSEQResult(this.jobId, 'out').subscribe(
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
