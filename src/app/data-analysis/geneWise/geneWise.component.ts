import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';

@Component({
  selector: 'app-geneWise',
  templateUrl: './geneWise.component.html',
  styleUrls: ['./geneWise.component.css']
})
export class GeneWiseComponent implements OnInit {
  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  isSubmitted = false;

  para: any = [];
  pretty: any = [];
  genes: any = [];
  trans: any = [];
  cdna: any = [];
  embl: any = [];
  ace: any = [];
  gff: any = [];
  diana: any = [];
  init: any = [];
  splice: any = [];
  random: any = [];
  alg: any = [];
  asequence: any = [];
  bsequence: any = [];
  public buttonName: any = 'More option...';
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient) { }
  registrationForm = this.fb.group({

    para: new FormControl(''),
    pretty: new FormControl(''),
    genes: new FormControl(''),
    trans: new FormControl(''),
    cdna: new FormControl(''),
    embl: new FormControl(''),
    ace: new FormControl(''),
    gff: new FormControl(''),
    diana: new FormControl(''),
    init: new FormControl(''),
    splice: new FormControl(''),
    random: new FormControl(''),
    alg: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
    asequence: new FormControl(''),
    bsequence: new FormControl(''),

  });
  async ngOnInit() {
    this.para = await this.service.getformat('genewise/parameterdetails/para').toPromise();
    this.pretty = await this.service.getformat('genewise/parameterdetails/pretty').toPromise();
    this.genes = await this.service.getformat('genewise/parameterdetails/genes').toPromise();
    this.trans = await this.service.getformat('genewise/parameterdetails/trans').toPromise();
    this.cdna = await this.service.getformat('genewise/parameterdetails/cdna').toPromise();
    this.embl = await this.service.getformat('genewise/parameterdetails/embl').toPromise();
    this.ace = await this.service.getformat('genewise/parameterdetails/ace').toPromise();
    this.gff = await this.service.getformat('genewise/parameterdetails/gff').toPromise();
    this.alg = await this.service.getformat('genewise/parameterdetails/alg').toPromise();
    this.diana = await this.service.getformat('genewise/parameterdetails/diana').toPromise();
    this.init = await this.service.getformat('genewise/parameterdetails/init').toPromise();
    this.splice = await this.service.getformat('genewise/parameterdetails/splice').toPromise();
    this.random = await this.service.getformat('genewise/parameterdetails/random').toPromise();
  }
  toggle() {
    this.registrationForm.controls.asequence.setValue("MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFCSSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLGLENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWNSLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQLPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHNAIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLGLTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDNGLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGPLQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDCGCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEAHFAPC");
    this.registrationForm.controls.bsequence.setValue("ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATGCTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCTGGCAGGAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGACCTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCTGGGCCTGTACGGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTGAGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACTACGTGAAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGCAAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCTGCTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTACGTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTGAACCTGCCCATCAACGGCAACGGCAAGCAGTAG  ");
  }
  checkbox() {
    this.show3 = !this.show3
  }
  handleClear() {
    this.registrationForm.controls.asequence.setValue('');
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
    let url = "https://www.ebi.ac.uk/Tools/services/rest/genewise/run";
    this.http.post(url, formdata, { headers: new HttpHeaders({ 'Accept': 'text/plain' }) }).subscribe(res => console.log("Data Post Done"));
  }

}
