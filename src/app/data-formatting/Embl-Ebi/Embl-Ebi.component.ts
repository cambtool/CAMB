import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataformatingService } from '../dataformating.service';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-Embl-Ebi',
  templateUrl: './Embl-Ebi.component.html',
  styleUrls: ['./Embl-Ebi.component.css']
})
export class EmblEbiComponent implements OnInit {
  name = '';
  jobId: any = '';
  jobStatus: string = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
  taxids: any = []
  negative_taxids: any = []
  gapopen: any = []
  gapext: any = []
  program: any = []
  task: any = []
  scores: any = []
  alignments: any = []
  matrix: any = []
  dropoff: any = []
  exp: any = []
  filter: any = []
  database: any = []
  match_scores: any = []
  hsps: any = []
  gapalign: any = []
  wordsize: any = []
  seqrange: any = []

  compstats: any = []
  align: any = []
  transltable: any = []
  stype: any = []
  data: any = [];
  sequence:any=[]
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient  , private toaster: ToastrService, public dialog: MatDialog) { }
  registrationForm = this.fb.group({
    matrix: new FormControl(''),
    sequence: new FormControl(''),
    gapopen: new FormControl(''),
    gapext: new FormControl(''),
    task: new FormControl(''),
    program: new FormControl(''),
    scores: new FormControl(''),
    alignments: new FormControl(''),
    dropoff: new FormControl(''),
    exp: new FormControl(''),
    filter: new FormControl(''),
    seqrange: new FormControl(''),
    database: new FormControl(''),
    match_scores: new FormControl(''),
    hsps: new FormControl(''),
    gapalign: new FormControl(''),
    wordsize: new FormControl(''),
    taxids: new FormControl(''),
    compstats: new FormControl(''),
    align: new FormControl(''),
    transltable: new FormControl(''),
    stype: new FormControl(''),
    negative_taxids: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
  });
  async ngOnInit() {
    this.program = await this.service.getformat('ncbiblast/parameterdetails/program').toPromise();
    this.task = await this.service.getformat('ncbiblast/parameterdetails/task').toPromise();
    this.matrix = await this.service.getformat('ncbiblast/parameterdetails/matrix').toPromise();
    this.alignments = await this.service.getformat('ncbiblast/parameterdetails/alignments').toPromise();
    this.scores = await this.service.getformat('ncbiblast/parameterdetails/scores').toPromise();
    this.exp = await this.service.getformat('ncbiblast/parameterdetails/exp').toPromise();
    this.dropoff = await this.service.getformat('ncbiblast/parameterdetails/dropoff').toPromise();
    this.match_scores = await this.service.getformat('ncbiblast/parameterdetails/match_scores').toPromise();
    this.hsps = await this.service.getformat('ncbiblast/parameterdetails/hsps').toPromise();
    this.gapopen = await this.service.getformat('ncbiblast/parameterdetails/gapopen').toPromise();
    this.gapext = await this.service.getformat('ncbiblast/parameterdetails/gapext').toPromise();
    this.filter = await this.service.getformat('ncbiblast/parameterdetails/filter').toPromise();
    this.gapalign = await this.service.getformat('ncbiblast/parameterdetails/gapalign').toPromise();
    this.wordsize = await this.service.getformat('ncbiblast/parameterdetails/wordsize').toPromise();
    this.taxids = await this.service.getformat('ncbiblast/parameterdetails/taxids').toPromise();
    this.negative_taxids = await this.service.getformat('ncbiblast/parameterdetails/negative_taxids').toPromise();
    this.compstats = await this.service.getformat('ncbiblast/parameterdetails/compstats').toPromise();
    this.align = await this.service.getformat('ncbiblast/parameterdetails/align').toPromise();
    this.transltable = await this.service.getformat('ncbiblast/parameterdetails/transltable').toPromise();
    this.stype = await this.service.getformat('ncbiblast/parameterdetails/stype').toPromise();
    this.seqrange = await this.service.getformat('ncbiblast/parameterdetails/seqrange').toPromise();
    this.database = await this.service.getformat('ncbiblast/parameterdetails/database').toPromise();
    this.sequence = await this.service.getformat('ncbiblast/parameterdetails/sequence').toPromise();

    console.log(this.taxids);

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
    formdata.append("stype", this.registrationForm.get('stype')?.value);
    formdata.append("program", this.registrationForm.get('program')?.value);
    formdata.append("matrix", this.registrationForm.get('matrix')?.value);
    formdata.append("alignments", this.registrationForm.get('alignments')?.value);
    formdata.append("exp", this.registrationForm.get('exp')?.value);
    formdata.append("match_scores", this.registrationForm.get('match_scores')?.value);
    formdata.append("gapopen", this.registrationForm.get('gapopen')?.value);
    formdata.append("gapext", this.registrationForm.get('gapext')?.value);
    formdata.append("filter", this.registrationForm.get('filter')?.value);
    formdata.append("gapalign", this.registrationForm.get('gapalign')?.value);
    formdata.append("wordsize", this.registrationForm.get('wordsize')?.value);
    // formdata.append("taxids", this.registrationForm.get('taxids')?.value);
    // formdata.append("negative_taxids", this.registrationForm.get('negative_taxids')?.value);
    formdata.append("compstats", this.registrationForm.get('compstats')?.value);
    formdata.append("align", this.registrationForm.get('align')?.value);
    formdata.append("transltable", this.registrationForm.get('transltable')?.value);
    formdata.append("seqrange", this.registrationForm.get('seqrange')?.value);
    formdata.append("database", this.registrationForm.get('database')?.value);
    formdata.append("task", this.registrationForm.get('task')?.value);
    formdata.append("scores", this.registrationForm.get('scores')?.value);
    formdata.append("dropoff", this.registrationForm.get('dropoff')?.value);

    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.service.ncbiblast_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.service.getncbiblastStatus(this.jobId).subscribe(
              data => {
                this.toaster.success(data.toString())
              }, (error) => {
                if (error.status == 200) {
                  this.jobStatus = error.error.text
                  this.toaster.info(this.jobStatus)
                  setTimeout(() => {
                    // if (this.jobStatus != "FAILURE") {
                    this.service.getncbiblastResult(this.jobId, 'out').subscribe(
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




