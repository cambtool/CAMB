import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataformatingService } from '../dataformating.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../result/result.component';
@Component({
  selector: 'app-embossSeqret',
  templateUrl: './embossSeqret.component.html',
  styleUrls: ['./embossSeqret.component.css']
})
export class EmbossSeqretComponent implements OnInit {
  inputformat: any = [];
  outputformat: any = [];
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
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

  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient,
    private toaster: ToastrService, public dialog: MatDialog
  ) {

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
    this.inputformat = await this.service.getformat('emboss_seqret/parameterdetails/inputformat').toPromise();
    this.outputformat = await this.service.getformat('emboss_seqret/parameterdetails/outputformat').toPromise();
    this.feature = await this.service.getformat('emboss_seqret/parameterdetails/feature').toPromise();
    this.firstonly = await this.service.getformat('emboss_seqret/parameterdetails/firstonly').toPromise();
    this.reverse = await this.service.getformat('emboss_seqret/parameterdetails/reverse').toPromise();
    this.outputcase = await this.service.getformat('emboss_seqret/parameterdetails/outputcase').toPromise();
    this.seqrange = await this.service.getformat('emboss_seqret/parameterdetails/seqrange').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("ENA|HZ245980|HZ245980.1 JP 2015518816-A/6284: MODIFIED POLYNUCLEOTIDES FOR THE PRODUCTION OF ONCOLOGY-RELATED PROTEINS AND PEPTIDES. ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.sequence.setValue('');
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
    this.service.Run(formdata).subscribe((data) => {
      console.log(data);
      this.jobId = data;
      if (this.jobId != null) {
        this.service.getStatus(this.jobId).subscribe(
          data => {
            this.toaster.success(data.toString())
          }, (error) => {
            this.toaster.success(error.toString())
          }
        )
      }
    }, res => {
      console.log(res);
      // console.log(res.error.text);
      if (res.status == 200) {
        this.jobId = res.error.text;
        if (this.jobId != null) {
          this.service.getStatus(this.jobId).subscribe(
            data => {
              this.toaster.success(data.toString())
            }, (error) => {
              if (error.status == 200) {
                this.jobStatus = error.error.text
                this.toaster.info(this.jobStatus)
                setTimeout(() => {
                  // if (this.jobStatus != "FAILURE") {
                  this.service.getResult(this.jobId, 'out').subscribe(
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
                }, 2000);

              }
            }
          )
        }
      }
    })


    // this.service.Run(formdata).subscribe(res => {
    //   this.jobId = res;
    //   console.log(this.jobId);
    //   if (this.jobId != null) {
    //     this.service.getStatus(this.jobId).subscribe(
    //       data => {
    //         this.toaster.success(data.toString())
    //       }
    //     )
    //   }
    // });
  }
}

