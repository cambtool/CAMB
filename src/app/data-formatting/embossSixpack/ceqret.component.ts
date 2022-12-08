import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataformatingService } from '../dataformating.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-ceqret',
  templateUrl: './ceqret.component.html',
  styleUrls: ['./ceqret.component.css']
})
export class CeqretComponent implements OnInit {
  sequence: any = [];
  lastorf: any = [];
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
  codontable: any = [];
  reverse: any = [];
  orfminsize: any = [];
  firstorf: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobStatus: any;
  jobId: any;
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient,
    private toaster: ToastrService, public dialog: MatDialog) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    lastorf: new FormControl(''),
    codontable: new FormControl(''),
    reverse: new FormControl(''),
    orfminsize: new FormControl(''),
    firstorf: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
  });
  async ngOnInit() {
    this.codontable = await this.service.getformat('emboss_sixpack/parameterdetails/codontable').toPromise();
    this.firstorf = await this.service.getformat('emboss_sixpack/parameterdetails/firstorf').toPromise();
    this.lastorf = await this.service.getformat('emboss_sixpack/parameterdetails/lastorf').toPromise();
    this.reverse = await this.service.getformat('emboss_sixpack/parameterdetails/reverse').toPromise();
    this.orfminsize = await this.service.getformat('emboss_sixpack/parameterdetails/orfminsize').toPromise();
    // this.sequence = await this.service.getformat('emboss_sixpack/parameterdetails/sequence').toPromise();
    // this.outputcase = await this.service.getformat('parameterdetails/outputcase').toPromise();
    // this.seqrange = await this.service.getformat('parameterdetails/seqrange').toPromise();
  }
  toggle() {
    // this.show = !this.show;
    this.registrationForm.controls.sequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
  }
  toggleinput() {
    this.show2 = !this.show2
    if (this.show2)
      this.buttonName = "See Less";
    else
      this.buttonName = "More option";
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.sequence.setValue('');
  }


  get cityName() {
    return this.registrationForm.get('cityName');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("lastorf", this.registrationForm.get('lastorf')?.value);
    formdata.append("codontable", this.registrationForm.get('codontable')?.value);
    formdata.append("reverse", this.registrationForm.get('reverse')?.value);
    formdata.append("orfminsize", this.registrationForm.get('orfminsize')?.value);
    formdata.append("firstorf", this.registrationForm.get('firstorf')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.service.emboss_sixpack_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.service.getEmboss_SixpackStatus(this.jobId).subscribe(
              data => {
                this.toaster.success(data.toString())
              }, (error) => {
                if (error.status == 200) {
                  this.jobStatus = error.error.text
                  this.toaster.info(this.jobStatus)
                  setTimeout(() => {
                    // if (this.jobStatus != "FAILURE") {
                    this.service.getEmboss_sixpackResult(this.jobId, 'out').subscribe(
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
                  }, 3000);
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
