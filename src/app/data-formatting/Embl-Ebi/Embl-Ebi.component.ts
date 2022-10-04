import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';

@Component({
  selector: 'app-Embl-Ebi',
  templateUrl: './Embl-Ebi.component.html',
  styleUrls: ['./Embl-Ebi.component.css']
})
export class EmblEbiComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
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
  taxids: any = []
  compstats: any = []
  align: any = []
  transltable: any = []
  stype: any = []
  data: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
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
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("stype", this.registrationForm.get('stype')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    let url = "https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/run";
    this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));

  }

}
