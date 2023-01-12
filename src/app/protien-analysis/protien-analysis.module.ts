import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtienAnalysisRoutingModule } from './protien-analysis-routing.module';
import { ProtienAnalysisComponent } from './protien-analysis.component';
import { PepinfoComponent } from './pepinfo/pepinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PepStatsComponent } from './pepStats/pepStats.component';


@NgModule({
  declarations: [
    ProtienAnalysisComponent,
    PepinfoComponent,
    PepStatsComponent
  ],
  imports: [
    CommonModule,
    ProtienAnalysisRoutingModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ProtienAnalysisModule { }
