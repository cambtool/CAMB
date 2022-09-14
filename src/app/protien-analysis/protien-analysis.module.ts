import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtienAnalysisRoutingModule } from './protien-analysis-routing.module';
import { ProtienAnalysisComponent } from './protien-analysis.component';


@NgModule({
  declarations: [
    ProtienAnalysisComponent
  ],
  imports: [
    CommonModule,
    ProtienAnalysisRoutingModule
  ]
})
export class ProtienAnalysisModule { }
