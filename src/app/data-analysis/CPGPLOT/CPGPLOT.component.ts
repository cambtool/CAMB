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
  selector: 'app-CPGPLOT',
  templateUrl: './CPGPLOT.component.html',
  styleUrls: ['./CPGPLOT.component.css']
})
export class CPGPLOTComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
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
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient , private toaster: ToastrService,public dialog: MatDialog) { }
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
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.sequence.setValue('');
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
    // let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_cpgplot/run";
    // this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));



    this.service.CPGPLOt_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.getResult();
            // this.service.CPGPLOtStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         // if (this.jobStatus != "FAILURE") {
            //         this.service.CPGPLOtResult(this.jobId, 'out').subscribe(
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
    // this.spinner.show()

    this.currentSub = timer(20000).pipe(
      mergeMap(() => 
      this.service.CPGPLOtStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.CPGPLOtResult(this.jobId, 'out').subscribe(
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
