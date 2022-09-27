import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbossSeqretComponent } from './embossSeqret/embossSeqret.component';
import { DataFormattingRoutingModule } from './data-formatting-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataformatingService } from './dataformating.service';
import { CeqretComponent } from './embossSixpack/ceqret.component';
import { PhylogencyComponent } from './Phylogency/Phylogency.component';
import { PSI_blastComponent } from './PSI_blast/PSI_blast.component';
import { EmblEbiComponent } from './Embl-Ebi/Embl-Ebi.component';
import { EmbossNewcpgreportComponent } from './embossNewcpgreport/embossNewcpgreport.component';

@NgModule({
  declarations: [
    EmbossSeqretComponent,
    CeqretComponent,
    PhylogencyComponent,
    PSI_blastComponent,
    EmblEbiComponent,
    EmbossNewcpgreportComponent

  ],
  imports: [
    CommonModule,
    DataFormattingRoutingModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MatSelectModule,
  ],
  providers: [DataformatingService]
})
export class DataFormattingModule { }
