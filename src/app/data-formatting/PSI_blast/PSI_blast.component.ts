import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';

@Component({
  selector: 'app-PSI_blast',
  templateUrl: './PSI_blast.component.html',
  styleUrls: ['./PSI_blast.component.css']
})
export class PSI_blastComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
  matrix: any = []
  gapopen: any = []
  gapext: any = []
  psithr: any = []
  expthr: any = []
  scores: any = []
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
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
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
    console.log(this.selectedHits = await this.service.getformat('psiblast/parameterdetails/selectedHits').toPromise());

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
    let url = "https://www.ebi.ac.uk/Tools/services/rest/psiblast/run";
    this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));

  }

}
