import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';

@Component({
  selector: 'app-Phylogency',
  templateUrl: './Phylogency.component.html',
  styleUrls: ['./Phylogency.component.css']
})
export class PhylogencyComponent implements OnInit {
  sequence: any = [];
  tossgaps: any = [];
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
  tree: any = [];
  clustering: any = [];
  pim: any = [];
  kimura: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    tossgaps: new FormControl(''),
    tree: new FormControl(''),
    clustering: new FormControl(''),
    pim: new FormControl(''),
    kimura: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),


  });
  async ngOnInit() {
    this.tree = await this.service.getformat('simple_phylogeny/parameterdetails/tree').toPromise();
    this.kimura = await this.service.getformat('simple_phylogeny/parameterdetails/kimura').toPromise();
    this.tossgaps = await this.service.getformat('simple_phylogeny/parameterdetails/tossgaps').toPromise();
    this.clustering = await this.service.getformat('simple_phylogeny/parameterdetails/clustering').toPromise();
    this.pim = await this.service.getformat('simple_phylogeny/parameterdetails/pim').toPromise();
    this.sequence = await this.service.getformat('simple_phylogeny/parameterdetails/sequence').toPromise();
  }
  toggle() {
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
    let url = "https://www.ebi.ac.uk/Tools/services/rest/simple_phylogeny/run";
    this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));
  }

}
