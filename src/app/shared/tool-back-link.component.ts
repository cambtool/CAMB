import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-back',
  template: `<a class="tool-back" [routerLink]="link">{{ label }}</a>`
})
export class ToolBackLinkComponent {
  link = '/home';
  label = 'Back';

  constructor(private router: Router) {
    const url = this.router.url;
    if (url.includes('/dataFormatting')) {
      this.link = '/dataFormatting/Detail';
      this.label = 'Back to Data Formatting';
    } else if (url.includes('/dataAnalysis')) {
      this.link = '/dataAnalysis/Detail';
      this.label = 'Back to DNA Analysis';
    } else if (url.includes('/protienAnalysis')) {
      this.link = '/protienAnalysis/Detail';
      this.label = 'Back to Protein Analysis';
    }
  }
}
