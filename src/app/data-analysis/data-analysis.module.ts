import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { DataAnalysisComponent } from './data-analysis.component';
import { EmbossNewcpgreportComponent } from './embossNewcpgreport/embossNewcpgreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataFormattingRoutingModule } from '../data-formatting/data-formatting-routing.module';
import { GeneWiseComponent } from './geneWise/geneWise.component';
import { SeqckSumComponent } from './SeqckSum/SeqckSum.component';
import { IsochoreComponent } from './isochore/isochore.component';
import { CPGPLOTComponent } from './CPGPLOT/CPGPLOT.component';
import { EmbosTranseqComponent } from './embosTranseq/embosTranseq.component';
import { BackTranseqComponent } from './backTranseq/backTranseq.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    DataAnalysisComponent,
    EmbossNewcpgreportComponent,
    GeneWiseComponent,
    SeqckSumComponent,
    IsochoreComponent,
    CPGPLOTComponent,
    EmbosTranseqComponent,
    BackTranseqComponent
  ],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatSelectModule,
  ],
})
export class DataAnalysisModule { }
