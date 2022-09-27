import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from '../dataformating.service';

@Component({
  selector: 'app-embossNewcpgreport',
  templateUrl: './embossNewcpgreport.component.html',
  styleUrls: ['./embossNewcpgreport.component.css']
})
export class EmbossNewcpgreportComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;

  window: any = [];
  minlen: any = [];
  minoe: any = [];
  minpc: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    window: new FormControl(''),
    minoe: new FormControl(''),
    minpc: new FormControl(''),
    minlen: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),

  });
  async ngOnInit() {
    this.window = await this.service.getformat('emboss_newcpgreport/parameterdetails/window').toPromise();
    this.minoe = await this.service.getformat('emboss_newcpgreport/parameterdetails/minoe').toPromise();
    this.minpc = await this.service.getformat('emboss_newcpgreport/parameterdetails/minpc').toPromise();
    this.minlen = await this.service.getformat('emboss_newcpgreport/parameterdetails/minlen').toPromise();
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue("ENA|HZ245980|HZ245980.1 JP 2015518816-A/6284: MODIFIED POLYNUCLEOTIDES FOR THE PRODUCTION OF ONCOLOGY-RELATED PROTEINS AND PEPTIDES. ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG");
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.name = ' ';
  }
  onSubmit(xml: any): void {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
    const headers = new HttpHeaders()
    this.http.post(url, xml).subscribe(res => console.log("Data Post Done"));
  }
}
