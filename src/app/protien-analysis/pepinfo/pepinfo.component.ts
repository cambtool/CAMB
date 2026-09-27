import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { EbiJobRunnerService } from 'src/app/core/ebi-job-runner.service';
import { toggleMoreOptions, toggleFlag, clearControl } from 'src/app/core/tool-form.helpers';

@Component({
  selector: 'app-pepinfo',
  templateUrl: './pepinfo.component.html',
  styleUrls: ['./pepinfo.component.css']
})
export class PepinfoComponent implements OnInit {

  sequence: any = [];

  name = '';
  show: boolean = false;
  show2 = false;
  show3 = false;
  currentSub: Subscription | undefined;
  showLoader: boolean = false
  isSubmitted = false;
  hwindow: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobStatus: any;
  jobId: any;
  constructor(public fb: FormBuilder, private service: DataformatingService , private toaster: ToastrService, public dialog: MatDialog, private jobRunner: EbiJobRunnerService) { }
  registrationForm = this.fb.group({
    sequence: new FormControl(''),
    hwindow: new FormControl(''),
    email: new FormControl(''),
    title: new FormControl(''),
  });
  async ngOnInit() {
    this.hwindow = await this.service.getformat('emboss_pepinfo/parameterdetails/hwindow').toPromise();
  }
  toggle() {
    // this.show = !this.show;
    this.registrationForm.controls.sequence.setValue("MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFCSSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLGLENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWNSLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQLPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHNAIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLGLTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDNGLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGPLQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDCGCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEAHFAPC");
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
    formdata.append("hwindow", this.registrationForm.get('hwindow')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.currentSub = this.jobRunner.submit({
      run: this.service.emboss_pepinfo_Run(formdata),
      status: (jobId) => this.service.getEmboss_pepinfoStatus(jobId),
      result: (jobId) => this.service.getEmboss_pepinfoResult(jobId, 'out'),
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

