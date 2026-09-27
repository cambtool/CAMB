import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from '../dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleMoreOptions, toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-Phylogency',
  templateUrl: './Phylogency.component.html',
  styleUrls: ['./Phylogency.component.css']
})
export class PhylogencyComponent implements OnInit {
  tossgaps: any = [];
  name = '';
  currentSub: Subscription | undefined;
  show: boolean = false;
  show2 = false;
  show3 = false;
  showLoader: boolean = false;
  isSubmitted = false;
  tree: any = [];
  clustering: any = [];
  pim: any = [];
  kimura: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobId: any;
  jobStatus: any;
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
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
  }
  toggle() {
    this.registrationForm.controls.sequence.setValue(`CLUSTAL O(1.2.3) multiple sequence alignment
UniProt/Swiss-Prot|P26898|IL2RA_SHEEP      MEPSLLMWRFFVFIVVPGCVTEACHDDPPSLRNA----------MFKVLRYE----VGTM
UniProt/Swiss-Prot|P01590|IL2RA_MOUSE      MEPRLLMLGFLSLTIVPSCRAELCLYDPPEVPNA----------TFKALSYK----NGTI
UniProt/Swiss-Prot|P41690|IL2RA_FELCA      MEPSLLLWGILTFVVVHGHVTELCDENPPDIQHA----------TFKALTYK----TGTM
UniProt/Swiss-Prot|P01589|IL2RA_HUMAN      MDSYLLMWGLLTFIMVPGCQAELCDDDPPEIPHA----------TFKAMAYK----EGTM
UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU      MDPYLLMWGLLTFITVPGCQAELCDDDPPKITHA----------TFKAVAYK----EGTM
UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN      MLKPPLPLRSLLFLQLPLLGVGLNPKFLTPSGNEDIGGKPGTGGDFFLTSTPAGTLDVST
UniProt/Swiss-Prot|P40321|IL2RG_CANFA      MLKPPLPLRSLLFLQLSLLGVGLNSTVPMPNGNEDIT------PDFFLTATPSETLSVSS
UniProt/Swiss-Prot|P26896|IL2RB_RAT        MATVDLSWRLPLYILLLLLATT--------------------------------WVSAAV
UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE       ------------------------------------------------------------
UniProt/Swiss-Prot|P36835|IL2_CAPHI        ------------------------------------------------------------
UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO        ------------------------------------------------------------
UniProt/Swiss-Prot|Q29416|IL2_CANFA        ------------------------------------------------------------

UniProt/Swiss-Prot|P26898|IL2RA_SHEEP      INCDCKAGFRRVS---AVMRCVGDSSHSAWNNRCFCNSTSPAKNPV--------------
UniProt/Swiss-Prot|P01590|IL2RA_MOUSE      LNCECKRGFRRLKE-LVYMRCLGN----SWSSNCQCTSNSHDKS-R--------------
UniProt/Swiss-Prot|P41690|IL2RA_FELCA      LNCECKKGFRRISNGSAFMLCAGNSSHSSWENQCRCISTSPRAT-D--------------
UniProt/Swiss-Prot|P01589|IL2RA_HUMAN      LNCECKRGFRRIKSGSLYMLCTGNSSHSSWDNQCQCTSSATRNT-T--------------
UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU      LNCECKRGFRRIKSGSPYMLCTGNSSHSSWDNQCQCTSSAARNT-T--------------
UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN      LPLPKVQC---FVFNVEYMNCTWNSSSEPQPNNLTLHYGYRNFNGDDKLQECGHYLFS--
UniProt/Swiss-Prot|P40321|IL2RG_CANFA      LPLPEVQC---FVFNVEYMNCTWNSSSEPRPTNLTLHYWYKNSN-DDKVQECGHYLFS--
UniProt/Swiss-Prot|P26896|IL2RB_RAT        NDCSHLKC---FYNSRANVSCMWSPEEALNVTSCHIHAK-SDMRHWNKTCELTPVRQASW
UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE       ---------------------MAVEELQSIIKRCQILEE-HDFKEEDF----GLFQLAGQ
UniProt/Swiss-Prot|P36835|IL2_CAPHI        ------------------------------------------------------------
UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO        ------------------------------------------------------------
UniProt/Swiss-Prot|Q29416|IL2_CANFA        ------------------------------------------------------------`);
  }
  toggleinput() {
    const more = toggleMoreOptions(this.show2);
    this.show2 = more.show;
    this.buttonName = more.label;
  }
  checkbox() {
    this.show3 = toggleFlag(this.show3);
  }
  handleClear() {
    clearControl(this.registrationForm, 'sequence');
  }
  get cityName() {
    return this.registrationForm.get('cityName');
  }
  onSubmit(xml: any): void {
    let formdata = new FormData();
    formdata.append("email", this.registrationForm.get('email')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("tossgaps", this.registrationForm.get('tossgaps')?.value);
    formdata.append("tree", this.registrationForm.get('tree')?.value);
    formdata.append("clustering", this.registrationForm.get('clustering')?.value);
    formdata.append("pim", this.registrationForm.get('pim')?.value);
    formdata.append("kimura", this.registrationForm.get('kimura')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.phylogency_Run(formdata),
      status: (jobId) => this.service.getPhylogencyStatus(jobId),
      result: (jobId) => this.service.getPhylogencyResult(jobId, 'out'),
      pollDelayMs: 10000,
      toaster: this.toaster,
      dialog: this.dialog,
      setLoading: (loading) => this.showLoader = loading,
      onJobId: (jobId) => this.jobId = jobId,
      onStatus: (status) => this.jobStatus = status,
    });
  }

  ngOnDestroy() {
    this.currentSub?.unsubscribe();
  }
}
