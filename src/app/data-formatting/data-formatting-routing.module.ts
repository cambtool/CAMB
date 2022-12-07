import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbossSeqretComponent } from './embossSeqret/embossSeqret.component';
import { DataformatingService } from './dataformating.service';
import { CeqretComponent } from './embossSixpack/ceqret.component';
import { PhylogencyComponent } from './Phylogency/Phylogency.component';
import { PSI_blastComponent } from './PSI_blast/PSI_blast.component';
import { EmblEbiComponent } from './Embl-Ebi/Embl-Ebi.component';
import { FASTAComponent } from './FASTA/FASTA.component';
import { FASTMComponent } from './FASTM/FASTM.component';


const routes: Routes = [
  { path: 'EmbossSeqret', component: EmbossSeqretComponent },
  { path: 'Sixpack', component: CeqretComponent },
  { path: 'Phylogeny', component: PhylogencyComponent },
  { path: 'PSi', component: PSI_blastComponent },
  { path: 'EBI', component: EmblEbiComponent },
  { path: 'fastA', component: FASTAComponent },
  { path: 'fastM', component: FASTMComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DataFormattingRoutingModule { }
