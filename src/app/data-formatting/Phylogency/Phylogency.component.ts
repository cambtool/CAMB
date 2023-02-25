import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DataformatingService } from '../dataformating.service';
import { ResultComponent } from '../result/result.component';

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
  isSubmitted = false;
  tree: any = [];
  clustering: any = [];
  pim: any = [];
  kimura: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobId: any;
  jobStatus: any;
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient,
    private toaster: ToastrService, public dialog: MatDialog) { }
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
    this.service.phylogency_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.getResult();
            // this.service.getPhylogencyStatus(this.jobId).subscribe(
            //   data => {
            //     this.toaster.success(data.toString())
            //   }, (error) => {
            //     if (error.status == 200) {
            //       this.jobStatus = error.error.text
            //       this.toaster.info(this.jobStatus)
            //       setTimeout(() => {
            //         this.service.getPhylogencyResult(this.jobId, 'out').subscribe(
            //           success => {
            //             console.log(success);
            //           },
            //           error => {
            //             console.log(error);
            //             if (error.status == 200) {
            //               let result = error.error.text;
            //               const dialogRef = this.dialog.open(ResultComponent, {
            //                 data: {
            //                   text: result
            //                 }
            //               });
            //             }else {
            //               this.toaster.error(error.error)
            //             }
            //           }
            //         )
            //       }, 15000);
            //     }
            //     else {
            //       this.toaster.error(error.error)
            //     }
            //   }
            // )
          }
        } else {
          this.toaster.error(error.error)
        }
      })
  }
  getResult() {
    // this.spinner.show()
    this.currentSub = timer(10000).pipe(
      mergeMap(() => 
      this.service.getPhylogencyStatus(this.jobId))
    ).subscribe((response:any)=>{
      console.log(response);
      // this.message_arr = response.resp;
    },(error)=>{
      console.log(error);
      if (error.status == 200) {
        this.jobStatus = error.error.text
        this.toaster.info(this.jobStatus)
        if (this.jobStatus!= "RUNNING") {
          this.service.getPhylogencyResult(this.jobId, 'out').subscribe(
            (response:any)=>{
              console.log(response);
              // this.message_arr = response.resp;
            },(error)=>{
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
                this.getResult()
              }
            }
          )
        } else{
          this.getResult()
        }
      }else {
        this.toaster.error(error.error)
        this.getResult()
      }
    });
  }
  ngOnDestroy () {
    this.currentSub?.unsubscribe()
  }
}
