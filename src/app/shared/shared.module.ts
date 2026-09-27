import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolBackLinkComponent } from './tool-back-link.component';

@NgModule({
  declarations: [ToolBackLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [ToolBackLinkComponent]
})
export class SharedModule { }
