import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';

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
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
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
    this.registrationForm.controls.sequence.setValue("ENA|HZ245980|HZ245980.1 JP 2015518816-A/6284: MODIFIED POLYNUCLEOTIDES FOR THE PRODUCTION OF ONCOLOGY-RELATED PROTEINS AND PEPTIDES. ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
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
    formdata.append("stype", this.registrationForm.get('stype')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_sixpack/run";
    this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));
  }
}
