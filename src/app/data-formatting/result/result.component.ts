import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { }

  result: any;
  fileUrl: any;
  base64String: any = '';
  ngOnInit() {
    console.log(this.data);
    this.result = this.data.text;
    this.base64String = this.result;
  }
  onClickDownloadPdf() {

    const blob = new Blob([this.base64String], {
      type: 'data:application/pdf;base64',
    });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    // var anchor = document.createElement("a");
    // anchor.href = url;
    // anchor.download = "report.pdf";

    // document.body.appendChild(anchor)
    // anchor.click();
    // document.body.removeChild(anchor)
  }
}
