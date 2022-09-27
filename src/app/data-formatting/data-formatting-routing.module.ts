import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbossSeqretComponent } from './embossSeqret/embossSeqret.component';
import { DataformatingService } from './dataformating.service';
import { CeqretComponent } from './embossSixpack/ceqret.component';
import { PhylogencyComponent } from './Phylogency/Phylogency.component';
import { PSI_blastComponent } from './PSI_blast/PSI_blast.component';
import { EmblEbiComponent } from './Embl-Ebi/Embl-Ebi.component';
import { EmbossNewcpgreportComponent } from './embossNewcpgreport/embossNewcpgreport.component';


const routes: Routes = [
  { path: 'EMBOSS', component: EmbossSeqretComponent },
  { path: 'Sixpack', component: CeqretComponent },
  { path: 'Phylogeny', component: PhylogencyComponent },
  { path: 'PSi', component: PSI_blastComponent },
  { path: 'EBI', component: EmblEbiComponent },
  { path: 'Newcpgreport', component: EmbossNewcpgreportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DataFormattingRoutingModule { }
