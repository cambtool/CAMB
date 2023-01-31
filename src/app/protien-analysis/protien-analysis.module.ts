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
import { PepWindowComponent } from './pepWindow/pepWindow.component';
import { SequenceStatistsComponent } from './sequenceStatists/sequenceStatists.component';
import { EmbossWaterComponent } from './embossWater/embossWater.component';
import { PrattComponent } from './pratt/pratt.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ProtienAnalysisComponent,
    PepinfoComponent,
    PepStatsComponent,
    PepWindowComponent,
    SequenceStatistsComponent,
    EmbossWaterComponent,
    PrattComponent
  ],
  imports: [
    CommonModule,
    ProtienAnalysisRoutingModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
  ],
  exports: [
    CommonModule,
    MatSelectModule,
  ],
})
export class ProtienAnalysisModule { }
