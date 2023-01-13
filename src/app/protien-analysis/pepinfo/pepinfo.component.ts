import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataformatingService } from 'src/app/data-formatting/dataformating.service';
import { ResultComponent } from 'src/app/data-formatting/result/result.component';

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
  isSubmitted = false;
  hwindow: any = [];
  data: any = [];
  public buttonName: any = 'More option...';
  jobStatus: any;
  jobId: any;
  constructor(public fb: FormBuilder, private service: DataformatingService, private http: HttpClient,
    private toaster: ToastrService, public dialog: MatDialog) { }
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
    formdata.append("hwindow", this.registrationForm.get('hwindow')?.value);
    formdata.append("sequence", this.registrationForm.get('sequence')?.value);
    formdata.append("title", this.registrationForm.get('title')?.value);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    }
    this.service.emboss_pepinfo_Run(formdata).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (error.status == 200) {
          this.jobId = error.error.text
          if (this.jobId != null) {
            this.service.getEmboss_pepinfoStatus(this.jobId).subscribe(
              data => {
                this.toaster.success(data.toString())
              }, (error) => {
                if (error.status == 200) {
                  this.jobStatus = error.error.text
                  this.toaster.info(this.jobStatus)
                  setTimeout(() => {
                    // if (this.jobStatus != "FAILURE") {
                    this.service.getEmboss_pepinfoResult(this.jobId, 'out').subscribe(
                      success => {
                        console.log(success);
                      },
                      error => {
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
                        }
                      }
                    )
                    // }
                  }, 20000);
                }
                else {
                  this.toaster.error(error.error)
                }
              }
            )
          }
        } else {
          this.toaster.error(error.error)
        }
      })
          }
        }

