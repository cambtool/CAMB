import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataformatingService } from '../dataformating.service';
@Component({
  selector: 'app-embossSeqret',
  templateUrl: './embossSeqret.component.html',
  styleUrls: ['./embossSeqret.component.css']
})
export class EmbossSeqretComponent implements OnInit {
  data: any = [];
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;
  FirtORF: any = ['YES', 'NO',];
  lastORF: any = ['Yes', 'No']
  reverse: any = ['Yes', 'No']
  size: any = ['1']
  public buttonName: any = 'More option...';

  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient
  ) { }
  registrationForm = this.fb.group({
    message: new FormControl(''),
    condt: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    first: new FormControl(''),
    last: new FormControl(''),
    reverse: new FormControl(''),
    size: new FormControl(''),


  });
  ngOnInit() {
    this.service.getData()
      .pipe()
      .subscribe((res) => {
        console.log(res.parameters);
        this.data = res.parameters
      });
  }
  toggle() {
    // this.show = !this.show;
    this.name =
      "ENA|HZ245980|HZ245980.1 JP 2015518816-A/6284: MODIFIED POLYNUCLEOTIDES FOR THE PRODUCTION OF ONCOLOGY-RELATED PROTEINS AND PEPTIDES. ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCT GGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCT GGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACT ACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCT GCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCT GCCCATCAACGGCAACGGCAAGCAGTAG"
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
    this.name = ' ';
  }


  get cityName() {
    return this.registrationForm.get('cityName');
  }

  onSubmit(xml: any): void {
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.registrationForm.value));
    }
    let url = "https://www.ebi.ac.uk/Tools/services/rest/emboss_seqret/run";
    const headers = new HttpHeaders()
    this.http.post(url, xml).subscribe(res => console.log("Data Post Done"));

  }
}
